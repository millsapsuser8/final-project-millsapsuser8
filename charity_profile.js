document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("charity-container");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error-message");
  const causeSelect = document.getElementById("cause-select");

  async function loadNews(query) {
    container.innerHTML = "";
    errorDiv.textContent = "";
    loading.style.display = "block";

    try {
      const response = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_83451d77423451431f5da903262172e953124&q=${encodeURIComponent(query)}&language=en&country=us`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      loading.style.display = "none";

      if (data.results && data.results.length > 0) {
        data.results.forEach(article => {
          const card = document.createElement("div");
          card.className = "charity-box";
          card.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description ? article.description.substring(0, 100) + "..." : "No description available."}</p>
            <a href="${article.link}" target="_blank">
              <button>Read More</button>
            </a>
          `;
          container.appendChild(card);
        });
      } else {
        errorDiv.textContent = "No news articles found for this topic.";
      }

    } catch (error) {
      loading.style.display = "none";
      errorDiv.textContent = "Sorry — couldn't load news articles. Please try again later.";
      console.error("Fetch error:", error);
    }
  }

  // First load with "volunteer"
  loadNews('volunteer');

  // Change news based on dropdown
  causeSelect.addEventListener("change", (e) => {
    const selectedCause = e.target.value;
    loadNews(selectedCause);
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
