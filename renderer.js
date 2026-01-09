const Handlebars = window.Handlebars;

const taskTemplate = Handlebars.compile(`
  <a href="add_task.html" id="new_task">Add Task</a>
{{#each tasks}}
<li class="{{#if done}}done{{/if}}" ondblclick="toggleTask({{@index}})">
  <strong>{{text}}</strong>
  {{#if desc}}<div class="desc">{{desc}}</div>{{/if}}
  <button onclick="deleteTask({{@index}})" class="delete-btn">Delete</button>
</li>
{{/each}}
`);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.renderTasks = function() {
  const el = document.getElementById('taskList');
  if (el) el.innerHTML = taskTemplate({ tasks });
};

window.addTask = function() {
  const input = document.getElementById('taskInput');
  const descInput = document.getElementById('descInput');
  if (input && input.value.trim()) {
    tasks.push({ text: input.value.trim(), desc: descInput ? descInput.value.trim() : '', done: false });
    input.value = '';
    if (descInput) descInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    // If we're not on the list page, go back to it
    if (!document.getElementById('taskList')) {
      window.location.href = 'active_list.html';
    }
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
