document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);
  input.value = "";
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  };

  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(text) {
  const tasks = getTasksFromStorage();
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateLocalStorage() {
  const listItems = document.querySelectorAll("#taskList li");
  const tasks = Array.from(listItems).map(li => ({
    text: li.childNodes[0].textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
