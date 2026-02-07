function getCookie(name) {
  let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function loadTasks() {
  const saved = getCookie("tasks");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.reverse();
    tasks.forEach((task) => addTask(task, false));
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#ft_list div").forEach((div) => {
    tasks.push(div.textContent);
  });
  document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + ";";
}

function addTask(text, save = true) {
  const ftList = document.getElementById("ft_list");
  const task = document.createElement("div");
  task.textContent = text;

  task.addEventListener("click", function () {
    if (confirm("Remove?")) {
      ftList.removeChild(task);
      saveTasks();
    }
  });

  ftList.insertBefore(task, ftList.firstChild);
  if (save) saveTasks();
}

document.getElementById("new").addEventListener("click", function () {
  let text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTask(text.trim());
  }
});

window.onload = loadTasks;
