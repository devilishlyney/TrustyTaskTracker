const Handlebars = require('handlebars');

const taskTemplate = Handlebars.compile(`
{{#each tasks}}
<li class="{{#if done}}done{{/if}}" ondblclick="toggleTask({{index}})">
  {{text}}
  <button onclick="deleteTask({{index}})">Delete</button>
</li>
{{/each}}
`);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.renderTasks = function() {
  document.getElementById('taskList').innerHTML = taskTemplate({ tasks });
};

window.addTask = function() {
  const input = document.getElementById('taskInput');
  if (input.value.trim()) {
    tasks.push({ text: input.value, done: false });
    input.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
};

window.toggleTask = function(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

window.deleteTask = function(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

renderTasks();
