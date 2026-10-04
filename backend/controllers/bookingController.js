let bookings = [];

function isRoomAvailable(roomType, date, startTime, endTime) {
    return !bookings.some(booking =>
        booking.roomType === roomType &&
        booking.date === date &&
        booking.startTime === startTime &&
        booking.endTime === endTime
    );
}

exports.createBooking = (req, res) => {
    const { fullName, email, date, startTime, endTime, roomType, purpose, remarks } = req.body;

    if (!fullName || !email || !date || !startTime || !endTime || !roomType || !purpose) {
        return res.send(`
            <h1>Booking Declined</h1>
            <p>Please fill out all required fields.</p>
            <a href="/booking.html">Go Back</a>
        `);
    }

    if (!email.includes("@")) {
        return res.send(`
            <h1>Booking Declined</h1>
            <p>Please enter a valid student email.</p>
            <a href="/booking.html">Go Back</a>
        `);
    }

    if (!isRoomAvailable(roomType, date, startTime, endTime)) {
        return res.send(`
            <h1>Booking Declined</h1>
            <p>This room is not available at the selected date and time.</p>
            <a href="/booking.html">Go Back</a>
        `);
    }

    const booking = {
        id: bookings.length + 1,
        fullName,
        email,
        date,
        startTime,
        endTime,
        roomType,
        purpose,
        remarks: remarks || "None",
        status: "Confirmed"
    };

    bookings.push(booking);

    res.redirect(`/confirmation/${booking.id}`);
};

exports.getBookings = (req, res) => {
    res.json(bookings);
};

exports.checkAvailability = (req, res) => {
    const { roomType, date, startTime, endTime } = req.query;

    if (!roomType || !date || !startTime || !endTime) {
        return res.json({
            available: false,
            message: "Missing required availability information."
        });
    }

    const available = isRoomAvailable(roomType, date, startTime, endTime);

    res.json({
        available,
        message: available ? "Room is available." : "Room is not available."
    });
};

exports.showConfirmation = (req, res) => {
    const booking = bookings.find(item => item.id === Number(req.params.id));

    if (!booking) {
        return res.send(`
            <h1>Booking Not Found</h1>
            <p>No booking was found with that ID.</p>
            <a href="/booking.html">Go Back</a>
        `);
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <header style="display:flex; align-items:center; justify-content:space-between; padding:15px 40px; background:white; border-bottom:1px solid #ddd;">
                <div style="display:flex; align-items:center;">
                    <img src="/images/uh-logo.png" style="width:45px; margin-right:10px;" alt="UH Logo">
                    <h1 style="font-size:18px; margin:0;">UH Sugar Land Student Center</h1>
                </div>

                <nav>
                    <a href="/index.html">Home</a>
                    <a href="/faq.html">FAQ</a>
                    <a href="/booking.html">Booking</a>
                    <a href="/reference.html">Reference</a>
                </nav>
            </header>

            <section class="booking-hero">
                <h1>Booking Confirmed</h1>
                <p>Your room reservation has been successfully submitted.</p>
            </section>

            <section class="booking-section">
                <div class="booking-form-card">
                    <h2>Confirmation Details</h2>
                    <p><strong>Name:</strong> ${booking.fullName}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Date:</strong> ${booking.date}</p>
                    <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
                    <p><strong>Room:</strong> ${booking.roomType}</p>
                    <p><strong>Purpose:</strong> ${booking.purpose}</p>
                    <p><strong>Remarks:</strong> ${booking.remarks}</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                    <a href="/booking.html" class="btn">Submit Another Booking</a>
                </div>
            </section>

            <footer style="background:#333; color:white; text-align:center; padding:20px;">
                <p>Gerardo Vera | gavera@cougarnet.uh.edu</p>
            </footer>
        </body>
        </html>
    `);
};