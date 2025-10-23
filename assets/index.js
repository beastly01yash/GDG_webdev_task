document.querySelectorAll('.add-task').forEach(addTaskDiv => {
  const input = addTaskDiv.querySelector('input');
  const button = addTaskDiv.querySelector('button');
  const tasksDiv = addTaskDiv.parentElement.querySelector('.tasks');

  button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
      createTask(tasksDiv, input.value);
      input.value = '';
    }
  });
});

function createTask(container, text) {
  const task = document.createElement('div');
  task.className = 'task';
  task.textContent = text;

  const buttonsDiv = document.createElement('div');

  const moveLeft = document.createElement('button');
  moveLeft.textContent = '←';
  moveLeft.addEventListener('click', () => moveTask(task, -1));

  const moveRight = document.createElement('button');
  moveRight.textContent = '→';
  moveRight.addEventListener('click', () => moveTask(task, 1));

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'delete';
  delBtn.addEventListener('click', () => task.remove());

  buttonsDiv.appendChild(moveLeft);
  buttonsDiv.appendChild(moveRight);
  buttonsDiv.appendChild(delBtn);

  task.appendChild(buttonsDiv);
  container.appendChild(task);
}

function moveTask(task, direction) {
  const columns = ['todo', 'inprogress', 'done'];
  const currentColumn = task.parentElement.parentElement.id;
  let index = columns.indexOf(currentColumn) + direction;
  if (index < 0 || index >= columns.length) return; // prevent moving out of board
  const targetColumn = document.getElementById(columns[index]).querySelector('.tasks');
  targetColumn.appendChild(task);
}
