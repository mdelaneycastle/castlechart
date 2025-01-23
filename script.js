const flowchart = document.getElementById("flowchart");
const modal = document.getElementById("addPersonModal");
const form = document.getElementById("addPersonForm");
const popup = document.getElementById("personDetailsPopup");
const popupContent = document.getElementById("popupContent");

let nodes = []; // Store all people

// Open Modal
function openModal() {
  modal.classList.remove("hidden");
}

// Close Modal
function closeModal() {
  modal.classList.add("hidden");
}

// Open Popup
function openPopup(content) {
  popupContent.innerHTML = content;
  popup.classList.remove("hidden");
}

// Close Popup
function closePopup() {
  popup.classList.add("hidden");
}

// Add Person to the Flowchart
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("personName").value;
  const title = document.getElementById("personTitle").value;
  const department = document.getElementById("personDepartment").value;
  const phone = document.getElementById("personPhone").value;
  const email = document.getElementById("personEmail").value;
  const bossId = document.getElementById("personBossId").value || null;
  const photo = document.getElementById("personPhoto").value;

  const id = Date.now(); // Unique ID

  const newPerson = { id, name, title, department, phone, email, bossId, photo };
  nodes.push(newPerson);

  renderFlowchart();
  closeModal();
});

// Render Flowchart
function renderFlowchart() {
  flowchart.innerHTML = ""; // Clear existing chart

  nodes.forEach((node) => {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");

    nodeElement.innerHTML = `
      <img src="${node.photo}" alt="${node.name}">
      <h3>${node.name}</h3>
      <p>${node.department}</p>
    `;

    nodeElement.addEventListener("click", () => showDetails(node));
    flowchart.appendChild(nodeElement);
  });
}

// Show Details in Popup
function showDetails(person) {
  const details = `
    <h2>${person.name}</h2>
    <p><strong>Title:</strong> ${person.title}</p>
    <p><strong>Phone:</strong> ${person.phone}</p>
    <p><strong>Email:</strong> <a href="mailto:${person.email}">${person.email}</a></p>
  `;
  openPopup(details);
}
