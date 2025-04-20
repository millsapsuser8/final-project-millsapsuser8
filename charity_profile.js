document.addEventListener("DOMContentLoaded", () => {
  const volunteerBtn = document.getElementById("volunteer-btn");
  const formContainer = document.getElementById("form-container");

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

  volunteerBtn.addEventListener("click", () => {
    formContainer.innerHTML = "";

    const form = document.createElement("form");
    form.classList.add("volunteer-form");

    form.appendChild(createInput("text", "name", "Name:"));
    form.appendChild(createInput("email", "email", "Email:"));

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    form.appendChild(submitBtn);

    formContainer.appendChild(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements["name"].value;
      formContainer.innerHTML = `<p class="success-message">Thanks for volunteering, ${name}!</p>`;
    });
  });

  // Add hover class using JS
  volunteerBtn.addEventListener("mouseenter", () => {
    volunteerBtn.classList.add("hovered");
  });

  volunteerBtn.addEventListener("mouseleave", () => {
    volunteerBtn.classList.remove("hovered");
  });
});
