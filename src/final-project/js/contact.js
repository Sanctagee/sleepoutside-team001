const contactForm = document.getElementById("contactForm");
const contactConfirmation = document.getElementById("contactConfirmation");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate form
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  // Collect form data
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    subject: contactForm.subject.value,
    message: contactForm.message.value
  };

  // Simulate sending message
  contactConfirmation.textContent = `✅ Thank you, ${formData.name}! Your message has been sent. We’ll get back to you soon.`;
  contactForm.reset();

  // Optionally store messages in localStorage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(formData);
  localStorage.setItem("messages", JSON.stringify(messages));
});
