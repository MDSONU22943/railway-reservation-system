# Phase 0 – Lesson 2: HTTP Methods and REST API Fundamentals

## 1. Lesson objectives

By the end of this lesson, you should be able to:
- choose the correct HTTP method for an operation;
- distinguish path parameters, query parameters, and request bodies;
- read request data in Express using `req.params`, `req.query`, and `req.body`;
- understand common HTTP status codes;
- test basic REST endpoints.

## 2. What is an HTTP method?

An HTTP method describes the intended action for a request.

| Method | Typical purpose | RailBook example |
|---|---|---|
| GET | Read/retrieve a resource | `GET /trains` |
| POST | Create a resource | `POST /trains` |
| PUT | Replace a resource representation | `PUT /trains/12368` |
| PATCH | Partially update a resource | `PATCH /trains/12368` |
| DELETE | Delete a resource | `DELETE /trains/12368` |

A useful distinction:
- GET should be safe: it should not change server data.
- PUT and DELETE are idempotent by HTTP semantics: repeating the same request should have the same intended final effect as sending it once.
- POST is generally not idempotent: sending the same create request twice may create two resources unless the server prevents duplicates or uses an idempotency mechanism.

## 3. What is a REST API?

REST (Representational State Transfer) is an architectural style for designing networked APIs. In a REST-style API, resources are identified by URLs and HTTP methods express the requested operation.

For RailBook, `/trains` represents the train collection and `/trains/12368` identifies one train.

## 4. Three places request data can appear

### 4.1 Path parameters

Path parameters identify a particular resource or part of the URL path.

Request:

```http
GET /trains/12368
```

Express route:

```js
app.get("/trains/:trainNumber", (req, res) => {
    console.log(req.params.trainNumber); // "12368"
});
```

Access them with `req.params`. Values arrive as strings, so validate and convert them when a number is expected.

### 4.2 Query parameters

Query parameters provide optional criteria, commonly for searching, filtering, sorting, or pagination.

Request:

```http
GET /trains?from=Bhagalpur&to=Delhi
```

Express:

```js
app.get("/trains", (req, res) => {
    console.log(req.query.from); // "Bhagalpur"
    console.log(req.query.to);   // "Delhi"
});
```

Access them with `req.query`. Query parameters are part of the URL and are visible in browser history, logs, and shared links. Do not put passwords, tokens, or other secrets in URLs.

### 4.3 Request body

The request body carries data submitted by the client, commonly for POST, PUT, or PATCH requests.

Request:

```http
POST /trains
Content-Type: application/json
```

JSON body:

```json
{
  "trainNumber": 12345,
  "trainName": "Bhagalpur Express",
  "source": "Bhagalpur",
  "destination": "Delhi"
}
```

In Express, enable JSON parsing before the routes:

```js
app.use(express.json());
```

Then read the parsed data from `req.body`.

## 5. RailBook endpoint map

| Request | Purpose |
|---|---|
| `GET /trains` | List all trains |
| `GET /trains?from=Bhagalpur&to=Delhi` | Filter trains by source/destination |
| `GET /trains/12368` | Get one train |
| `POST /trains` | Create a train |
| `PUT /trains/12368` | Replace the editable fields of a train |
| `PATCH /trains/12368` | Update selected fields only |
| `DELETE /trains/12368` | Delete one train |

## 6. HTTP status codes used in this lesson

| Code | Meaning | Example |
|---|---|---|
| 200 OK | Request succeeded | Train returned or updated |
| 201 Created | New resource created | Train added |
| 204 No Content | Request succeeded; no response body | Train deleted |
| 400 Bad Request | Invalid input | Missing required field or malformed JSON |
| 404 Not Found | Resource does not exist | Unknown train number |
| 409 Conflict | Conflicts with current data | Duplicate train number |
| 500 Internal Server Error | Unexpected server failure | Unhandled server-side error |

## 7. Run the Lesson 2 server

Open a terminal in `backend/phase-0-lesson-02` and run:

```bash
npm install
npm start
```

The server listens at `http://localhost:3001`.

The Lesson 1 server uses port 3000. Lesson 2 uses port 3001 so both lesson folders can remain independent.

## 8. Important learning limitation

This lesson stores trains in a JavaScript array in memory. It is only for learning HTTP and Express. Any trains added, changed, or deleted will reset when the server restarts. We will introduce persistent PostgreSQL storage in a later phase.

## 9. Suggested manual API tests

Use a browser for GET requests, or Postman/Thunder Client/curl for requests with JSON bodies.

1. List trains: `GET http://localhost:3001/trains`
2. Filter: `GET http://localhost:3001/trains?from=Bhagalpur&to=New%20Delhi`
3. Get one: `GET http://localhost:3001/trains/12368`
4. Create: `POST http://localhost:3001/trains` with JSON body:

   ```json
   {
     "trainNumber": 12999,
     "trainName": "Test Express",
     "source": "Bhagalpur",
     "destination": "Patna"
   }
   ```

5. Replace: `PUT http://localhost:3001/trains/12999` with all editable fields:

   ```json
   {
     "trainName": "Updated Test Express",
     "source": "Bhagalpur",
     "destination": "New Delhi"
   }
   ```

6. Partially update: `PATCH http://localhost:3001/trains/12999` with:

   ```json
   {
     "destination": "Kolkata"
   }
   ```

7. Delete: `DELETE http://localhost:3001/trains/12999`

Try GET on `/trains/12999` after deletion; it should return 404.

## 10. Lesson 2 quiz

1. Which HTTP method is normally used to retrieve train information?
2. Which method is normally used to create a new train?
3. What is the difference between PUT and PATCH?
4. In `GET /trains/12368`, what does `req.params.trainNumber` contain?
5. In `GET /trains?from=Bhagalpur`, which Express property provides the `from` value?
6. Which Express middleware parses JSON request bodies?
7. Which status code is suitable when a new train is successfully created?
8. Why should secrets not be sent as query parameters?

Do not move to the next lesson until you can explain these concepts and test the endpoints.
