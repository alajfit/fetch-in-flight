import FIF from "../index";
import { FetchMock } from "jest-fetch-mock";
const fetchMock = fetch as FetchMock;

const fetcher = new FIF(fetch);

describe("Fetch In Flight", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Prevent Multiple Network Requests", () => {
    fetchMock.mockResponse(
      () =>
        new Promise(resolve => setTimeout(() => resolve({ body: "ok" }), 1000))
    );

    fetcher.fetch("http://www.google.com");
    fetcher.fetch("http://www.google.com");
    fetcher.fetch("http://www.google.com");

    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});
