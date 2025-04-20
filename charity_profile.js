// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const volunteerBtn = document.getElementById("volunteer-btn");
  const formContainer = document.getElementById("form-container");

  volunteerBtn.addEventListener("click", () => {
    // Clear if form already exists
    formContainer.innerHTML = "";

    // Create form
    const form = document.createElement("form");

    // Name input
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name: ";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.required = true;

    // Email input
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email: ";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;

    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";

    // Append elements
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement("br"));

    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(document.createElement("br"));

    form.appendChild(submitBtn);
    formContainer.appendChild(form);

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(`Thanks for volunteering, ${nameInput.value}!`);
      form.reset();
    });
  });

  // ✅ Additional interactive element: Highlight button on hover
  volunteerBtn.addEventListener("mouseover", () => {
    volunteerBtn.style.backgroundColor = "#28a745";
    volunteerBtn.style.color = "white";
    volunteerBtn.style.cursor = "pointer";
  });

  volunteerBtn.addEventListener("mouseout", () => {
    volunteerBtn.style.backgroundColor = "";
    volunteerBtn.style.color = "";
  });
});
