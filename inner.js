const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = [];

// Load tasks from localStorage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Add task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const taskDateTime = taskDate.value;

  if (taskText && taskDateTime) {
    const task = {
      id: Date.now(),
      text: taskText,
      date: taskDateTime,
      completed: false,
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskDate.value = '';
  } else {
    alert('Please enter a task and select a date/time.');
  }
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
    taskItem.innerHTML = `
      <span>${task.text} (${new Date(task.date).toLocaleString()})</span>
      <div class="task-actions">
        <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Toggle complete
function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  const newText = prompt('Edit your task:', task.text);
  const newDate = prompt('Edit the date and time (YYYY-MM-DDTHH:MM):', task.date);

  if (newText && newDate) {
    task.text = newText;
    task.date = newDate;
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}