document.addEventListener("DOMContentLoaded", () => {
  // Helper to build label+input groups
  const createInput = (type, name, labelText) => {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", name);

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = name;
    input.required = true;

    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group");
    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  };

  // Attach behavior to every Volunteer button
  document.querySelectorAll(".volunteer-btn").forEach(btn => {
    const formContainer = btn.nextElementSibling; // assumes .form-container follows

    // Build & show form on click
    btn.addEventListener("click", () => {
      formContainer.innerHTML = ""; // clear any old content

      const form = document.createElement("form");
      form.classList.add("volunteer-form");

      form.appendChild(createInput("text", "name", "Name:"));
      form.appendChild(createInput("email", "email", "Email:"));

      const submitBtn = document.createElement("button");
      submitBtn.type = "submit";
      submitBtn.textContent = "Submit";
      form.appendChild(submitBtn);

      formContainer.appendChild(form);

      // Handle form submission
      form.addEventListener("submit", e => {
        e.preventDefault();
        const name = form.elements["name"].value;
        formContainer.innerHTML =
          `<p class="success-message">Thanks for volunteering, ${name}!</p>`;
      });
    });

    // Hover effects
    btn.addEventListener("mouseenter", () => btn.classList.add("hovered"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("hovered"));
  });
});
