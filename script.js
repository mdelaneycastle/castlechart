const flowchart = document.getElementById("flowchart");
const modal = document.getElementById("addPersonModal");
const form = document.getElementById("addPersonForm");

let nodes = []; // Stores all people in a hierarchical structure

// Open Modal
function openModal() {
  modal.classList.remove("hidden");
}

// Close Modal
function closeModal() {
  modal.classList.add("hidden");
}

// Add Person to the Flowchart
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("personName").value;
  const title = document.getElementById("personTitle").value;
  const bossId = document.getElementById("personBossId").value || null;
  const photo = document.getElementById("personPhoto").value;

  const id = Date.now(); // Unique ID for each person

  const newPerson = { id, name, title, bossId, photo, children: [] };

  if (bossId) {
    // Find boss and add as their child
    const boss = nodes.find((node) => node.id == bossId);
    if (boss) {
      boss.children.push(newPerson);
    }
  } else {
    // If no boss, this person is a top-level node
    nodes.push(newPerson);
  }

  renderFlowchart();
  closeModal();
});

// Render Flowchart
function renderFlowchart() {
  flowchart.innerHTML = ""; // Clear existing chart
  nodes.forEach((node) => {
    // Render each top-level node
    flowchart.appendChild(createNodeElement(node));
  });
}

// Create Node Element Recursively
function createNodeElement(node) {
  const nodeElement = document.createElement("div");
  nodeElement.classList.add("node");

  nodeElement.innerHTML = `
    <img src="${node.photo}" alt="${node.name}">
    <h3>${node.name}</h3>
    <p>${node.title}</p>
  `;

  // Add children
  if (node.children.length > 0) {
    const childrenContainer = document.createElement("div");
    childrenContainer.classList.add("children");
    node.children.forEach((child) => {
      childrenContainer.appendChild(createNodeElement(child));
    });
    nodeElement.appendChild(childrenContainer);
  }

  return nodeElement;
}
