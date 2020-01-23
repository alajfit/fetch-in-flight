export default class FIF {
  private flights = new Map();
  private CACHE_TIME = 0;
  private CACHE_FETCH;

  constructor(fetch, cacheTime = 0) {
    this.CACHE_FETCH = fetch ? fetch : window.fetch;
    this.CACHE_TIME = cacheTime;
  }

  private hashCode(code: string): string {
    return Array.from(code)
      .reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0)
      .toString();
  }

  private uniqueKey(url: string, options: RequestInit, unique: boolean) {
    return this.hashCode(
      url +
        (options.method || "GET") +
        JSON.stringify(options) +
        (unique ? Math.random() : "")
    );
  }

  private newFlight(key: string, url, options, resolve, reject) {
    this.flights.set(key, {
      promise: this.CACHE_FETCH(url, { ...options })
        .then(data => this.landing(key, "resolve", data))
        .catch(err => this.landing(key, "reject", err))
        .then(_ => this.cleanUp(key)),
      listeners: [{ resolve, reject }],
      cache: null
    });
  }

  private inFlight(key, resolver, rejecter) {
    this.flights.get(key).cache !== null
      ? resolver(this.flights.get(key).cache.clone())
      : this.flights.get(key).listeners.push({ resolver, rejecter });
  }

  private landing(key, type, response: Response) {
    this.flights
      .get(key)
      .listeners.forEach(listener => listener[type](response.clone()));
    if (type === "resolve") this.flights.get(key).cache = response;
  }

  private cleanUp(key) {
    setTimeout(
      () => this.flights.delete(key),
      this.flights.get(key).cache !== null ? this.CACHE_TIME : 0
    );
  }

  public fetch(url: string, options: RequestInit = {}, unique = false) {
    const key = this.uniqueKey(url, options, unique);
    return new Promise((resolve, reject) => {
      this.flights.get(key)
        ? this.inFlight(key, resolve, reject)
        : this.newFlight(key, url, options, resolve, reject);
    });
  }
}
