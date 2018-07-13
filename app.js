//DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task Event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear Tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

//GET TASKS FROM LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement('li');
    //Add class to li
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon
    link.innerHTML = '<i class="fa fa-times"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}

//ADD TASK
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
    return;
  }

  //Create li element
  const li = document.createElement('li');
  //Add class to li
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon
  link.innerHTML = '<i class="fa fa-times"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value);
  //Clear input
  taskInput.value = '';

  e.preventDefault();
}

//STORE TASK
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //REMOVE FROM LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS - 2 ways
function clearTasks() {
  //using innerHTML
  // taskList.innerHTML = '';

  //Faster way - while there is a task item it will keep removing
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //CLEAR FROM LS
  clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage() {
  // localStorage.clear();
  localStorage.removeItem('tasks');
}

//FILTER TASKS
function filterTasks(e) {
  //Value of what is being typed
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
