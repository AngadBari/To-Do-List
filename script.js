document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("ToDoInput");
  const addtaskbutton = document.getElementById("addTaskButton");
  const tasklist = document.getElementById("TaskList");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];

  tasks.forEach((task) => rendertask(task));

  addtaskbutton.addEventListener("click", function () {
    const taskadd = todoinput.value.trim();
    if (taskadd === "") return;

    const newtaskadd = {
      id: Date.now(),
      text: taskadd,
      completed: false,
    };

    tasks.push(newtaskadd);
    saveTask();
    rendertask(newtaskadd);
    todoinput.value = "";
  });

  function rendertask(task) {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between px-3 py-2 bg-gray-200 rounded";

    if (task.completed) li.classList.add("line-through");

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
        Delete
      </button>
    `;

    //Delete Button Query
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("line-through");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTask();
      li.remove();
    });

    tasklist.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
