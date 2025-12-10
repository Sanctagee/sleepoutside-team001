const bookingForm = document.getElementById("bookingForm");
const confirmation = document.getElementById("confirmation");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  // Collect form data
  const formData = {
    name: bookingForm.name.value,
    email: bookingForm.email.value,
    phone: bookingForm.phone.value,
    package: bookingForm.package.value,
    participants: bookingForm.participants.value,
    date: bookingForm.date.value
  };

  // Simulate booking success
  confirmation.textContent = `✅ Thank you, ${formData.name}! Your ${formData.package} tour has been reserved for ${formData.date}.`;
  bookingForm.reset();

  // Optionally store booking in localStorage
  localStorage.setItem("booking", JSON.stringify(formData));
});
