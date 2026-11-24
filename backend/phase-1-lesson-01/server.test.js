const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("./src/app");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve, reject) =>
    server.close((error) => error ? reject(error) : resolve())
  );
});

test("GET /trains lists sample trains", async () => {
  const res = await fetch(`${baseUrl}/trains`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.count, 2);
  assert.equal(body.data[0].trainNumber, 12368);
});

test("GET /trains filters by source and destination", async () => {
  const res = await fetch(`${baseUrl}/trains?from=Bhagalpur&to=New%20Delhi`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.count, 1);
  assert.equal(body.data[0].trainNumber, 12350);
});

test("GET /trains returns zero results when no train matches", async () => {
  const res = await fetch(`${baseUrl}/trains?from=Unknown`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.deepEqual(body, { count: 0, data: [] });
});
