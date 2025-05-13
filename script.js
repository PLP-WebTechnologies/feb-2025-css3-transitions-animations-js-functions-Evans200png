// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Live Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('liveClock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Profile Form
const profileForm = document.getElementById('profileForm');
const profileDisplay = document.getElementById('profileDisplay');

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  localStorage.setItem('profile', JSON.stringify({ name, email }));
  displayProfile();
  profileForm.reset();
});

function displayProfile() {
  const profile = JSON.parse(localStorage.getItem('profile'));
  if (profile) {
    profileDisplay.innerHTML = `<p><strong>Name:</strong> ${profile.name}</p>
                                 <p><strong>Email:</strong> ${profile.email}</p>`;
  }
}
displayProfile();

// To-do List
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
  }
});

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.addEventListener('click', () => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });
    todoList.appendChild(li);
  });
}
