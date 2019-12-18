export default class FIF {
    private inflight = new Map()

    constructor() {}

    private hashCode(code: string):string {
        return Array.from(code).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0).toString()
    }

    private uniqueKey(url: string, options: RequestInit, unique: boolean) {
        return this.hashCode(url + (options.method || 'GET') + JSON.stringify(options) + (unique ? Math.random() : ''))
    }

    private newFlight() {

    }

    private inFlight() {

    }

    private cleanUp() {

    }
    
    public fetch(url: string, options: RequestInit = {}, unqiue = false) {
        return new Promise((resolve, reject) => {
            fetch(url, { ...options })
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
}