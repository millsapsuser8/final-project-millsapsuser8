document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("charity-container");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error-message");
  const causeSelect = document.getElementById("cause-select");

  async function loadCharities(causeCategory) {
    container.innerHTML = "";      // clear old charities
    errorDiv.textContent = "";     // clear old errors
    loading.style.display = "block"; // show loading text

    try {
      const response = await fetch(`https://api.every.org/nonprofit/${causeCategory}?limit=9`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      loading.style.display = "none";

      data.nonprofits.forEach(charity => {
        const card = document.createElement("div");
        card.className = "charity-box";
        card.innerHTML = `
          <h3>${charity.name}</h3>
          <p>${charity.description ? charity.description.substring(0, 100) + "..." : "No description available."}</p>
          <a href="${charity.profileUrl}" target="_blank">
            <button>View Profile</button>
          </a>
        `;
        container.appendChild(card);
      });

    } catch (error) {
      loading.style.display = "none";
      errorDiv.textContent = "Sorry — couldn't load charities. Please try again later.";
      console.error("Fetch error:", error);
    }
  }

  // First load default (education)
  loadCharities('education');

  // Change cause when user picks a different dropdown option
  causeSelect.addEventListener("change", (e) => {
    const selectedCause = e.target.value;
    loadCharities(selectedCause);
  });
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
