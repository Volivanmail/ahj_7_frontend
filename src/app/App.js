import { v4 as uuidv4 } from 'uuid';
// import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import Task from './Task.js';
import Time from './Time.js';
import Popup from './Popup.js';
import postFoo from './req/post.js';

export default function MainFoo() {
  const btn = document.createElement('button');
  btn.classList = 'btn';
  btn.textContent = 'Добавить тикет';
  document.body.appendChild(btn);

  const taskList = document.createElement('ul');
  taskList.classList = 'ul';
  document.body.appendChild(taskList);

  btn.addEventListener('click', () => {
    const popup = new Popup('Добавить тикет');
    const dataPopup = popup.create();
    dataPopup.submit.addEventListener('click', (event) => {
      event.preventDefault();
      const newTask = new Task(uuidv4(), dataPopup.taskName.value, false, Time(new Date()), dataPopup.taskDesc.value);
      if (dataPopup.taskName.value && dataPopup.taskDesc.value) {
        taskList.appendChild(newTask.view());
        postFoo();
      }
      dataPopup.popup.remove();
    });
  });

  fetch('http://localhost:8080/').then((data) => data.json()).then((text) => {
    text.forEach((el) => {
      const task = new Task(el.id, el.name, el.status, el.created, el.description);
      taskList.appendChild(task.view());
    });
  });
}
