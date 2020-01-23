import FIF from "../index";
import { FetchMock } from "jest-fetch-mock";
const fetchMock = fetch as FetchMock;

describe("Fetch In Flight", () => {
  let fetcher;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Prevent Multiple Network Requests", async () => {
    fetcher = new FIF(fetch);

    fetchMock.mockResponse(
      () =>
        new Promise(resolve => setTimeout(() => resolve({ body: "ok" }), 1000))
    );

    await fetcher.fetch("http://www.google.com");
    await fetcher.fetch("http://www.google.com");
    await fetcher.fetch("http://www.google.com");

    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  test("Cache Should be present if passed", async () => {
    fetcher = new FIF(fetch, 5000);

    fetchMock.mockResponse(JSON.stringify({ body: "ok" }));

    await fetcher.fetch("http://www.google.com");

    fetchMock.mockResponse(
      () =>
        new Promise(resolve => setTimeout(() => resolve({ body: "ok" }), 500))
    );

    await fetcher.fetch("http://www.google.com");

    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});
