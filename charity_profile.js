document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("charity-container");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error-message");

  async function loadOpportunities() {
    try {
      const response = await fetch("https://api.volunteerconnector.org/public/opportunity/search?limit=9");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      loading.remove(); // Remove the "Loading..." message

      data.opportunities.forEach(opportunity => {
        const card = document.createElement("div");
        card.className = "charity-box";
        card.innerHTML = `
          <h3>${opportunity.organizationName || "Unnamed Organization"}</h3>
          <p>${opportunity.title || "Volunteer Opportunity"}</p>
          <a href="${opportunity.url}" target="_blank">
            <button>View Details</button>
          </a>
        `;
        container.appendChild(card);
      });

    } catch (error) {
      loading.remove();
      errorDiv.textContent = "Sorry — couldn't load opportunities. Please try again later.";
      console.error("Fetch error:", error);
    }
  }

  loadOpportunities();
});





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
