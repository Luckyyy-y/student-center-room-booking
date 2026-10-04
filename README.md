# Student center room booking

A UH coursework concept with an HTML/CSS/JavaScript frontend and a Node.js/Express backend. Visitors select a room and submit a booking request; the server validates a few fields, checks for an exact duplicate, stores the record in memory, and returns a confirmation.

This is a **student concept, not an official University of Houston booking service**. Use fictional data locally.

## Run locally

```sh
cd backend
npm ci
npm start
```

Open `http://localhost:3000`. Node.js 24.19.0 was used for the recorded checks. The server listens on port 3000. Stop it with Ctrl+C; restarting clears all bookings.

## Documentation

- [Request flow and routes](docs/architecture.md)
- [Recorded checks and limitations](docs/verification.md)
- [Source provenance and personal-copy changes](docs/provenance.md)
- [Original course reference / AI disclosure page](frontend/reference.html)

## Current scope

Bookings use an **in-memory JavaScript array**, not a JSON file or database. Exact duplicate time slots are rejected, but overlapping intervals with different times can still be accepted. There is no authentication, authorization, durable storage, or production-ready validation. Confirmation HTML interpolates input without escaping. See the limitations before extending the application.

## Credit

Personal documentation copy of Gerardo Vera's 2026 course repository, preserving the class repository. The original reference page acknowledges AI guidance; repository preparation, portability fixes, and documentation also used AI assistance. University branding and other image assets retain their respective rights; this repository does not grant a new license for them.
