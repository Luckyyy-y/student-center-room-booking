# Verification record

Checked locally on October 4, 2026 with Node.js 24.19.0 and the source lockfile dependencies. Fictional records only. HTTP checks do not establish visual layout or browser interaction quality.

- / -> HTTP 200
- /booking.html -> HTTP 200
- /faq.html -> HTTP 200
- /js/script.js -> HTTP 200
- /images/uh-logo.png -> HTTP 200
- Missing fields -> decline page (HTTP 200)
- Email without @ -> decline page (HTTP 200)
- Valid booking -> confirmation/1 via redirect
- Exact duplicate -> decline page (HTTP 200)
- Availability for booked slot -> false
- Missing availability query -> false
- Unknown ID -> not-found page (HTTP 200)
- Bookings endpoint -> 1 fictional record
- Overlapping interval -> accepted (known limitation)

## Remaining limitations

- Records are held in an array and disappear on restart; this follows directly from the controller implementation.
- Different overlapping intervals are accepted; observed above.
- Email validation only checks for `@`; no university-domain check.
- No authentication or authorization; all records can be requested anonymously.
- User input is interpolated into confirmation HTML without escaping; HTML injection remains possible.
- Dates, interval ordering, and room names are not validated against a defined set.
- Decline and not-found responses use HTTP 200.
- No browser visual check, load test, real-user test, or live deployment was performed.

## Next work

Escape output, validate inputs and overlapping intervals, add access control, and use durable storage before considering real bookings.
