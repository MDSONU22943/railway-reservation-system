# Phase 1 — Lesson 1: Express Backend Architecture

## Objective

Refactor the **read-only train search** into separate route, controller, service and data modules. Phase 0 remains untouched so you can compare both approaches.

## Request flow

```text
Client -> GET /trains?from=Bhagalpur
       -> src/app.js mounts /trains
       -> src/routes/train.routes.js matches GET /
       -> src/controllers/train.controller.js reads req.query
       -> src/services/train.service.js applies filtering rules
       -> src/data/trains.js supplies records
       -> controller returns HTTP 200 and JSON
```

## Responsibility of each file

| File | Why it exists |
|---|---|
| `server.js` | Starts listening on port 3002 |
| `src/app.js` | Creates Express app and mounts routes |
| `src/routes/train.routes.js` | Maps HTTP endpoints to controller methods |
| `src/controllers/train.controller.js` | Reads HTTP request and builds HTTP response |
| `src/services/train.service.js` | Handles the filtering logic without depending on Express |
| `src/data/trains.js` | Holds temporary in-memory sample data |
| `server.test.js` | Checks GET routes automatically |

**Key distinction:** Controllers use `req` and `res`. Services accept ordinary JavaScript values and return results.

## Run locally

From the repository root:

```powershell
git switch main
git pull origin main
cd backend/phase-1-lesson-01
npm install
npm start
```

Open http://localhost:3002/trains. Run `requests.http` in VS Code with the REST Client extension.

In a second terminal inside the same folder, run:

```powershell
npm test
```

Expected: 3 passing tests. Do not assume they pass until executed locally.

## Learning limits

- This lesson implements GET only; Phase 0 Lesson 2 still contains POST/PUT/PATCH/DELETE examples.
- Records are in a JavaScript array; no PostgreSQL persistence yet.
- No user accounts, authentication or real seat reservations yet.

## Knowledge check

1. Which layer should read `req.query` and call the service?
2. Which layer should filter train records?
3. Why should a service avoid depending on Express `req` and `res`?
4. Which file chooses the server port?
5. Which file mounts the `/trains` router?

## Next lesson

Add one-train lookup and CRUD endpoints, improve validation, and evolve the architecture step by step.
