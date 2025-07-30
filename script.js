function addTask() {
    let input = document.getElementById("todo-input");
    let task = input.value.trim();
    if (task === "") return;
    let ul = document.getElementById("todo-list");
    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleDone(this)">${task}</span>
                    <button class="delete-btn" onclick="removeTask(this)">Delete</button>`;
    ul.appendChild(li);
    input.value = "";
}

function removeTask(btn) {
    btn.parentElement.remove();
}

function toggleDone(span) {
    span.parentElement.classList.toggle("done");
}
