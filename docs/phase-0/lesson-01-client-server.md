# Phase 0 – Lesson 1: Client, Server, and Database

## 1. Lesson objective

Understand what happens when a user searches for trains in a railway booking application.

By the end of this lesson, you should be able to explain:
- what a client is;
- what a server does;
- why an application uses a database;
- how a request and response travel between them.

## 2. The three main parts

### Client

The client is the application the user interacts with. Examples:
- a website opened in a browser;
- a mobile application.

In RailBook, the client lets a passenger enter a source station, destination station, and journey date.

### Server

The server is the backend program that receives requests, applies application rules, and sends responses.

For example, when the passenger searches for trains, the backend receives the search details, checks them, retrieves matching train information, and returns the result.

### Database

The database stores information so it can be retrieved and updated later.

RailBook may store:
- stations;
- trains;
- train routes and schedules;
- coaches and seat inventory;
- users and bookings.

The server communicates with the database. The browser normally does not connect directly to the production database.

## 3. Request-response flow

Example: a passenger searches from Bhagalpur to New Delhi.

```text
Passenger
   |
   v
Client (browser / mobile app)
   |  HTTP request: source, destination, date
   v
Backend server (Node.js / Express)
   |  query matching train and route data
   v
Database (PostgreSQL, in a later phase)
   |
   |  matching records
   v
Backend server
   |  HTTP response (often JSON)
   v
Client displays train results
```

Remember: the client sends a request; the server processes it; the database stores or supplies persistent data; the server sends a response.

## 4. A tiny Express example

This example returns sample data. It does not connect to a database yet.

```js
const express = require("express");

const app = express();

app.get("/trains", (req, res) => {
    res.json([
        {
            trainNumber: 12368,
            trainName: "Vikramshila Express"
        },
        {
            trainNumber: 12350,
            trainName: "Bhagalpur Express"
        }
    ]);
});

app.listen(3000, () => {
    console.log("Railway server running");
});
```

### Line-by-line explanation

- `require("express")`: loads the Express library.
- `express()`: creates the backend application.
- `app.get("/trains", ...)`: defines a handler for HTTP GET requests sent to `/trains`.
- `req`: contains information about the incoming request.
- `res`: is used to send a response.
- `res.json(...)`: sends the sample train list as JSON.
- `app.listen(3000, ...)`: starts the server on port 3000.

If this server is running on your own computer, opening `http://localhost:3000/trains` in a browser sends a GET request to it.

## 5. Important distinction

This example uses hard-coded sample data. In a later database lesson, we will replace the hard-coded array with a PostgreSQL query. A real booking system also needs validation, authentication where required, error handling, and safe inventory allocation.

## 6. Lesson 1 recap

| Term | Meaning |
|---|---|
| Client | The browser or app used by the passenger |
| Server | Backend program that processes requests |
| Database | Persistent storage for application data |
| Request | Message sent by the client to the server |
| Response | Message returned by the server |
| JSON | Common data format used in API responses |

## 7. Quiz result

The learner correctly answered all three questions:

1. **Server** processes the train search request.
2. **Security:** the backend keeps database credentials private and enforces validation, authentication, and authorization instead of exposing direct database access to the browser.
3. **JSON response:** Express `res.json(data)` serializes the JavaScript value as JSON, sends it to the client, and sets the response content type.

Result: **3/3 correct – Lesson 1 quiz passed.**

## 8. Quiz

Answer these in your own words. Try without looking at the notes.

1. When a passenger searches for trains, which part usually processes the search request: client, server, or database?
2. Why should the browser normally not connect directly to the production database?
3. In the Express example, what does `res.json()` do?

Do not move to Lesson 2 until you can explain these three answers.
