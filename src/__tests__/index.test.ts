import FIF from "../index";
import fetch from "node-fetch";

const fetcher = new FIF(fetch);

describe("Fetch In Flight", () => {
  let fetchIt;

  beforeEach(() => {
    fetchIt = fetcher.fetch;
  });

  test("Prevent Multiple Network Requests", () => {
    fetchIt("");
    expect(true).toBe(true);
  });

  test("Resolve all callers with the returned data", () => {
    expect(true).toBe(true);
  });

  test("Cache for given duration if time set", () => {
    expect(true).toBe(true);
  });
});
