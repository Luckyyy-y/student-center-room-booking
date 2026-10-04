document.querySelectorAll(".faq-question").forEach(q => {
    q.onclick = () => {
        let a = q.nextElementSibling;
        a.style.display = a.style.display === "block" ? "none" : "block";
    };
});

const form = document.getElementById("booking-form");
const msg = document.getElementById("confirmation-message");

if (form) {
    form.onsubmit = (e) => {
        e.preventDefault();
        msg.textContent = "Booking submitted successfully!";
    };
}