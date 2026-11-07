# RailBook – Railway Reservation System

A step-by-step learning project to understand and build a railway ticket reservation platform, from HTTP fundamentals to concurrency, payments, and scalable deployment.

> **Learning project only:** RailBook is an educational implementation. It is not IRCTC's source code and does not claim to reproduce IRCTC's internal architecture.

## Project goals

- Learn how a client, backend server, and database work together.
- Build REST APIs using JavaScript, Node.js, and Express.
- Model trains, stations, routes, journeys, seat inventory, passengers, and bookings.
- Understand database transactions and concurrency so two users cannot book the same inventory.
- Add authentication, caching, background jobs, payment integration in test mode, testing, and deployment.

## Planned technology stack

| Area | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Cache / temporary data | Redis |
| Background jobs | RabbitMQ |
| Payments | Razorpay test mode |
| Testing | Jest, Supertest, k6 |
| Packaging / deployment | Docker; cloud deployment later |

We will introduce each technology only when the learning roadmap reaches it.

## Learning roadmap

| Phase | Topics | Status |
|---|---|---|
| 0 | Client/server, networking, HTTP, request-response | In progress |
| 1 | REST API design with Node.js and Express | Planned |
| 2 | PostgreSQL and relational data modelling | Planned |
| 3 | Authentication, password hashing, JWT, roles | Planned |
| 4 | Train search and booking workflow | Planned |
| 5 | Transactions, row locks, race conditions, seat allocation | Planned |
| 6 | Redis caching and temporary holds | Planned |
| 7 | RabbitMQ and asynchronous processing | Planned |
| 8 | Payment lifecycle and webhooks | Planned |
| 9 | Automated tests and load testing | Planned |
| 10 | Scaling, caching strategy, load balancing | Planned |
| 11 | Docker, deployment, monitoring | Planned |
| 12 | Security and system design | Planned |

## Repository structure (will grow as lessons are completed)

```text
railway-reservation-system/
├── README.md
├── docs/
│   └── phase-0/
│       └── lesson-01-client-server.md
├── backend/       # introduced in the API phase
├── frontend/      # introduced in the frontend phase
└── tests/         # introduced with automated testing
```

## How each lesson works

1. Concept in beginner-friendly language.
2. Real railway booking example.
3. Diagram or request-flow explanation.
4. Code walkthrough (when relevant).
5. Small quiz or practical exercise.
6. Notes and code committed to this repository.

We will move to the next lesson after the current exercise is understood.

## Important engineering concept

A railway booking system must protect inventory from concurrent requests. Checking availability and allocating a seat as separate, unprotected operations can cause a race condition. Later phases will demonstrate how database transactions and row-level locking can make allocation safe. Real railway inventory can also depend on the route segment, not merely on whether a seat is occupied for the entire train journey.

## Progress

- [x] Repository created.
- [x] Phase 0, Lesson 1: client, server, and database fundamentals explained in chat.
- [ ] Commit Lesson 1 notes and example code.
- [ ] Complete the Lesson 1 quiz.
