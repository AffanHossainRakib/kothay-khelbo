import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { apiFetch } from "../../lib/api.ts";

const API_URL = "http://api.test/api/v1";

afterEach(() => {
  delete process.env.API_URL;
});

// Replaces the global fetch for one test with a fake that records the URL.
const fakeFetch = (
  t: import("node:test").TestContext,
  status: number,
  body: unknown,
) => {
  const urls: string[] = [];
  t.mock.method(globalThis, "fetch", async (url: string) => {
    urls.push(url);
    return Response.json(body, { status });
  });
  return urls;
};

test("T1: returns data from a success reply", async (t) => {
  process.env.API_URL = API_URL;
  const urls = fakeFetch(t, 200, {
    success: true,
    message: "ok",
    data: { count: 3 },
  });

  assert.deepEqual(await apiFetch("/hits"), { count: 3 });
  assert.deepEqual(urls, [`${API_URL}/hits`]);
});

test("T2: throws the backend's message on an error reply", async (t) => {
  process.env.API_URL = API_URL;
  fakeFetch(t, 404, {
    success: false,
    message: "Route not found",
    errors: [],
  });

  await assert.rejects(apiFetch("/nope"), { message: "Route not found" });
});

test("T3: throws without calling fetch when API_URL is missing", async (t) => {
  const urls = fakeFetch(t, 200, {});

  await assert.rejects(apiFetch("/hits"), { message: "API_URL is not set" });
  assert.equal(urls.length, 0);
});
