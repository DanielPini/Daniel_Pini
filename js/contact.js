const publicKey = "yNVZUgWxbAhGcKpIN";
const serviceID = "service_pziawpp";
const templateID = "contact_form";

(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const statusEl = form.querySelector(".form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";

    // Honeypot check
    if (form.hp && form.hp.value.trim() !== "") {
      statusEl.textContent = "Spam detected.";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    // Basic validation
    if (!data.name || !data.email || !data.message || !data.type) {
      statusEl.textContent = "Please fill all required fields.";
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      statusEl.textContent = "Invalid email.";
      return;
    }

    statusEl.textContent = "Sending...";
    try {
      // TODO: Replace URL with real endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      statusEl.textContent = "Message sent. Thank you.";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Error sending message.";
    }
  });
})();
