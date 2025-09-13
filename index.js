const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeSwitch = document.getElementById('theme-switch');

// theme
document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
themeSwitch.checked = document.body.classList.contains('dark');

// page load
window.onload = () => {
  loadTasks();
};

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  let tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  taskInput.value = '';
  renderTasks();
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  let tasks = getTasks();
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
