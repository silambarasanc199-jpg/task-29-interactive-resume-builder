document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("input", updatePreview);

  updatePreview();

});


function valueOf(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}


function setText(id, value, fallback = "") {

  const element = document.getElementById(id);

  if (!element) return;

  element.textContent = value || fallback;
}


function addEducation() {

  const container = document.getElementById("educationContainer");

  const item = document.createElement("div");

  item.className = "dynamic-card education-item";

  item.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this)">×</button>

    <div class="form-grid">

      <div class="field">
        <label>Degree / Course</label>
        <input class="edu-degree" type="text"
          placeholder="Degree / Course">
      </div>

      <div class="field">
        <label>Institution</label>
        <input class="edu-school" type="text"
          placeholder="Institution">
      </div>

      <div class="field">
        <label>Year</label>
        <input class="edu-year" type="text"
          placeholder="Year">
      </div>

      <div class="field">
        <label>Score</label>
        <input class="edu-score" type="text"
          placeholder="CGPA / Percentage">
      </div>

    </div>
  `;

  container.appendChild(item);

  updatePreview();
}


function addExperience() {

  const container = document.getElementById("experienceContainer");

  const item = document.createElement("div");

  item.className = "dynamic-card experience-item";

  item.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this)">×</button>

    <div class="form-grid">

      <div class="field">
        <label>Role</label>
        <input class="exp-role" type="text"
          placeholder="Job Role">
      </div>

      <div class="field">
        <label>Company</label>
        <input class="exp-company" type="text"
          placeholder="Company">
      </div>

      <div class="field">
        <label>Duration</label>
        <input class="exp-duration" type="text"
          placeholder="Duration">
      </div>

      <div class="field full">
        <label>Description</label>
        <textarea class="exp-description"
          rows="3"
          placeholder="Describe your work"></textarea>
      </div>

    </div>
  `;

  container.appendChild(item);

  updatePreview();
}


function removeItem(button) {

  const item = button.closest(".dynamic-card");

  if (item) {
    item.remove();
    updatePreview();
  }

}


function updatePreview() {

  // PERSONAL

  setText(
    "previewName",
    valueOf("name"),
    "YOUR NAME"
  );

  setText(
    "previewTitle",
    valueOf("title"),
    "Professional Title"
  );

  setText(
    "previewEmail",
    valueOf("email"),
    "email@example.com"
  );

  setText(
    "previewPhone",
    valueOf("phone"),
    "+91 XXXXX XXXXX"
  );

  setText(
    "previewLocation",
    valueOf("location"),
    "City, India"
  );

  setText(
    "previewLinkedin",
    valueOf("linkedin")
  );

  setText(
    "previewGithub",
    valueOf("github")
  );


  // SUMMARY

  setText(
    "previewSummary",
    valueOf("summary"),
    "Your professional summary will appear here."
  );


  // EDUCATION

  const educationPreview =
    document.getElementById("previewEducation");

  educationPreview.innerHTML = "";

  const educationItems =
    document.querySelectorAll(".education-item");

  let hasEducation = false;

  educationItems.forEach(item => {

    const degree =
      item.querySelector(".edu-degree")?.value.trim();

    const school =
      item.querySelector(".edu-school")?.value.trim();

    const year =
      item.querySelector(".edu-year")?.value.trim();

    const score =
      item.querySelector(".edu-score")?.value.trim();

    if (degree || school || year || score) {

      hasEducation = true;

      const entry =
        document.createElement("div");

      entry.className = "resume-entry";

      entry.innerHTML = `
        <strong>${escapeHTML(degree || "Degree / Course")}</strong>

        <div class="meta">
          <span>${escapeHTML(school || "Institution")}</span>
          <span>${escapeHTML(year || "")}</span>
        </div>

        ${
          score
            ? `<p>${escapeHTML(score)}</p>`
            : ""
        }
      `;

      educationPreview.appendChild(entry);
    }

  });

  if (!hasEducation) {

    educationPreview.innerHTML =
      `<p class="empty">Education details will appear here.</p>`;

  }


  // EXPERIENCE

  const experiencePreview =
    document.getElementById("previewExperience");

  experiencePreview.innerHTML = "";

  const experienceItems =
    document.querySelectorAll(".experience-item");

  let hasExperience = false;

  experienceItems.forEach(item => {

    const role =
      item.querySelector(".exp-role")?.value.trim();

    const company =
      item.querySelector(".exp-company")?.value.trim();

    const duration =
      item.querySelector(".exp-duration")?.value.trim();

    const description =
      item.querySelector(".exp-description")?.value.trim();

    if (role || company || duration || description) {

      hasExperience = true;

      const entry =
        document.createElement("div");

      entry.className = "resume-entry";

      entry.innerHTML = `
        <strong>${escapeHTML(role || "Role")}</strong>

        <div class="meta">
          <span>${escapeHTML(company || "Company")}</span>
          <span>${escapeHTML(duration || "")}</span>
        </div>

        ${
          description
            ? `<p>${escapeHTML(description)}</p>`
            : ""
        }
      `;

      experiencePreview.appendChild(entry);
    }

  });

  if (!hasExperience) {

    experiencePreview.innerHTML =
      `<p class="empty">Experience details will appear here.</p>`;

  }


  // SKILLS

  const skillsPreview =
    document.getElementById("previewSkills");

  skillsPreview.innerHTML = "";

  const skills =
    valueOf("skills")
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean);

  if (!skills.length) {

    skillsPreview.innerHTML =
      `<span class="empty">Skills will appear here.</span>`;

    return;
  }

  skills.forEach(skill => {

    const span =
      document.createElement("span");

    span.className = "skill";

    span.textContent = skill;

    skillsPreview.appendChild(span);

  });

}


function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function clearResume() {

  const confirmed =
    confirm("Clear all resume information?");

  if (!confirmed) return;

  document.querySelectorAll("input, textarea")
    .forEach(element => {
      element.value = "";
    });

  updatePreview();

}
