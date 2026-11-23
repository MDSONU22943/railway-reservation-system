// Lesson 2: API integration tests using Node.js built-in test runner.
// No new npm testing packages required.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("./server");

let server;
let baseUrl;

before(async () => {
    // Port 0 lets the operating system select a free port.
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    if (server) await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test("GET /trains lists the sample trains", async () => {
    const response = await fetch(`${baseUrl}/trains`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.count, 2);
    assert.equal(body.data[0].trainNumber, 12368);
});

test("GET /trains filters by source and destination", async () => {
    const response = await fetch(`${baseUrl}/trains?from=Bhagalpur&to=New%20Delhi`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.count, 1);
    assert.equal(body.data[0].trainNumber, 12350);
});

test("GET /trains/:number reports missing trains", async () => {
    const response = await fetch(`${baseUrl}/trains/99999`);
    assert.equal(response.status, 404);
});

test("POST, PUT, PATCH and DELETE a train", async () => {
    const number = 12999;
    const request = (path, method, data) => fetch(`${baseUrl}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data === undefined ? undefined : JSON.stringify(data)
    });
    const create = await request("/trains", "POST", {
        trainNumber: number,
        trainName: "Test Express",
        source: "Bhagalpur",
        destination: "Patna"
    });
    assert.equal(create.status, 201);

    const duplicate = await request("/trains", "POST", {
        trainNumber: number, trainName: "Duplicate", source: "A", destination: "B"
    });
    assert.equal(duplicate.status, 409);

    const replace = await request(`/trains/${number}`, "PUT", {
        trainName: "Updated Express", source: "Bhagalpur", destination: "New Delhi"
    });
    assert.equal(replace.status, 200);

    const patch = await request(`/trains/${number}`, "PATCH", { destination: "Kolkata" });
    assert.equal(patch.status, 200);
    assert.equal((await patch.json()).data.destination, "Kolkata");

    const remove = await request(`/trains/${number}`, "DELETE");
    assert.equal(remove.status, 204);
    const missing = await request(`/trains/${number}`, "GET");
    assert.equal(missing.status, 404);
});

test("POST /trains rejects incomplete data", async () => {
    const response = await fetch(`${baseUrl}/trains`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainNumber: 10001 })
    });
    assert.equal(response.status, 400);
});
