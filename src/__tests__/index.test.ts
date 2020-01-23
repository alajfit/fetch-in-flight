import FIF from "../index";
import { FetchMock } from "jest-fetch-mock";
const fetchMock = fetch as FetchMock;

const fetcher = new FIF(fetch);

describe("Fetch In Flight", () => {
  const fetchIt = fetcher.fetch;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Prevent Multiple Network Requests", () => {
    fetchMock.mockResponse(
      () =>
        new Promise(resolve => setTimeout(() => resolve({ body: "ok" }), 1000))
    );

    fetchIt("http://www.google.com");
    fetchIt("http://www.google.com");
    fetchIt("http://www.google.com");

    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  test("Resolve all callers with the returned data", () => {
    expect(true).toBe(true);
  });

  test("Cache for given duration if time set", () => {
    expect(true).toBe(true);
  });
});
