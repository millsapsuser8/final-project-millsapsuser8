document.addEventListener("DOMContentLoaded", () => {
  const container   = document.getElementById("charity-container");
  const loading     = document.getElementById("loading");
  const errorDiv    = document.getElementById("error-message");

  async function loadCharities() {
    try {
      const res = await fetch(
        "https://api.data.charitynavigator.org/v2/Organizations" +
        "?app_id=YOUR_APP_ID" +
        "&app_key=YOUR_APP_KEY" +
        "&rated=true" +
        "&sort=RATING:DESC" +
        "&state=CA"               // you can drop or change the `state` filter
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      loading.remove();          // hide “Loading…” once we have data

      // take first 9 charities
      list.slice(0, 9).forEach(c => {
        const card = document.createElement("div");
        card.className = "charity-box";
        card.innerHTML = `
          <h3>${c.charityName}</h3>
          <p>${c.mission
            ? c.mission.substring(0, 100) + "…" 
            : "No description available."}</p>
          <a href="${c.websiteURL}" target="_blank">
            <button>Visit Website</button>
          </a>
        `;
        container.appendChild(card);
      });
    } catch (err) {
      loading.remove();
      errorDiv.textContent = "Sorry—couldn't load charities. Please try again later.";
      console.error("Fetch error:", err);
    }
  }

  loadCharities();
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
