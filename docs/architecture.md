# Request flow

The frontend contains the home page, room-selection form, FAQ, references, stylesheet, images, and FAQ script. Express serves these files and mounts the booking routes. The controller holds `let bookings = []` in process memory.

1. The form posts URL-encoded fields to `/bookings`.
2. The controller checks required fields and whether the email contains `@`.
3. An exact match on room, date, start time, and end time is considered unavailable.
4. Accepted records receive an incrementing ID and are appended to the array.
5. The response redirects to `/confirmation/:id`, which renders the stored record.

| Route | Current behavior |
| --- | --- |
| `POST /bookings` | Create a booking or render a decline message. Success redirects with HTTP 302. |
| `GET /bookings` | Return all in-memory records as JSON. No sign-in required. |
| `GET /availability` | Query `roomType`, `date`, `startTime`, `endTime`; return JSON availability for an exact slot. |
| `GET /confirmation/:id` | Render confirmation HTML, or a not-found message. |

Decline and not-found pages currently return HTTP 200. JSON is a response format here, not a persistence mechanism. A restart removes all records and restarts ID allocation.
