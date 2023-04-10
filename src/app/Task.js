import Popup from './Popup.js';
import delFoo from './req/del.js';
import putFoo from './req/put.js';

export default class Task {
  constructor(id, name, status, created, description) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
    this.description = description;
  }

  view() {
    const task = document.createElement('li');
    task.classList = 'li';

    const taskId = document.createElement('span');
    taskId.classList = 'id';
    taskId.textContent = this.id;
    task.appendChild(taskId);

    const taskStatus = document.createElement('input');
    taskStatus.type = 'checkbox';
    taskStatus.classList = 'checkbox';
    taskStatus.name = 'status';
    if (this.status) {
      taskStatus.checked = true;
    }
    task.appendChild(taskStatus);
    taskStatus.addEventListener('click', () => {
      putFoo(taskStatus);
    });

    const taskName = document.createElement('span');
    taskName.classList = 'taskName';
    taskName.textContent = this.name;
    task.appendChild(taskName);

    const taskDescription = document.createElement('p');
    taskDescription.classList = 'taskDesc desc-hide';
    taskDescription.textContent = this.description;
    task.appendChild(taskDescription);
    this.descriptionView(task);

    const taskCreated = document.createElement('div');
    taskCreated.classList = 'created';
    taskCreated.textContent = this.created;
    task.appendChild(taskCreated);

    const btnMod = document.createElement('button');
    btnMod.classList = 'btnMod';
    task.appendChild(btnMod);
    this.taskModifying(btnMod);

    const btnDel = document.createElement('button');
    btnDel.classList = 'btnDel';
    task.appendChild(btnDel);
    this.taskDelete(btnDel);

    return task;
  }

  descriptionView(el) {
    el.querySelector('.taskName').addEventListener('click', () => {
      const desc = el.querySelector('.taskDesc');
      if (desc.classList.contains('desc-hide')) {
        desc.classList.remove('desc-hide');
      } else {
        desc.classList.toggle('desc-hide');
      }
    });
  }

  taskModifying(btn) {
    btn.addEventListener('click', () => {
      const popup = new Popup('Изменить тикет');
      const dataPopup = popup.create();
      dataPopup.taskName.value = btn.parentElement.querySelector('.taskName').textContent;
      dataPopup.taskDesc.value = btn.parentElement.querySelector('.taskDesc').textContent;
      dataPopup.submit.addEventListener('click', (event) => {
        event.preventDefault();
        btn.parentElement.querySelector('.taskName').textContent = dataPopup.taskName.value;
        btn.parentElement.querySelector('.taskDesc').textContent = dataPopup.taskDesc.value;
        dataPopup.popup.remove();
        putFoo(btn);
      });
    });
  }

  taskDelete(btn) {
    btn.addEventListener('click', () => {
      const popDel = document.createElement('form');
      popDel.classList = 'popup';
      popDel.textContent = 'Удалить тикет';
      if (!document.body.contains(document.querySelector('.popup'))) {
        document.body.appendChild(popDel);

        const popDelText = document.createElement('div');
        popDelText.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо...';
        popDel.appendChild(popDelText);

        const submit = document.createElement('button');
        submit.textContent = 'Ok';
        popDel.appendChild(submit);
        submit.addEventListener('click', (event) => {
          event.preventDefault();
          btn.parentElement.remove();
          popDel.remove();

          delFoo(btn);
        });

        const cancel = document.createElement('button');
        cancel.textContent = 'Отмена';
        popDel.appendChild(cancel);
        cancel.addEventListener('click', () => {
          popDel.remove();
        });
      }
    });
  }
}
