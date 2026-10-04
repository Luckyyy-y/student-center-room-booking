const express = require("express");
const path = require("path");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = 3000;

const frontendPath = path.join(__dirname, "../frontend");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(frontendPath));

app.use("/", bookingRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/booking.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "booking.html"));
});

app.get("/faq.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "faq.html"));
});

app.get("/reference.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "reference.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Frontend folder: ${frontendPath}`);
});