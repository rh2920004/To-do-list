const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");

let tasks = [];

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    category,
    priority,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `
      <strong>${task.text}</strong>
      <small>Category: ${task.category} | Priority: ${task.priority}</small>
    `;

    const taskButtons = document.createElement("div");
    taskButtons.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => toggleComplete(task.id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(task.id);

    taskButtons.append(completeBtn, editBtn, deleteBtn);
    li.append(taskInfo, taskButtons);
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}
