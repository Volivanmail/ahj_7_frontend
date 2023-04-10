export default class Popup {
  constructor(name) {
    this.name = name;
  }

  create() {
    const popup = document.createElement('form');
    popup.method = 'POST';
    popup.action = 'http://localhost:8080';
    popup.classList = 'popup';
    popup.textContent = this.name;
    if (!document.body.contains(document.querySelector('.popup'))) {
      document.body.appendChild(popup);
    }

    const taskName = document.createElement('input');
    taskName.required = true;
    taskName.type = 'text';
    taskName.placeholder = 'Краткое описание';
    popup.appendChild(taskName);

    const taskDesc = document.createElement('textarea');
    taskDesc.required = true;
    taskDesc.placeholder = 'Подробное описание';
    popup.appendChild(taskDesc);

    const submit = document.createElement('button');
    submit.textContent = 'Ok';
    popup.appendChild(submit);

    const cancel = document.createElement('button');
    cancel.textContent = 'Отмена';
    popup.appendChild(cancel);
    cancel.addEventListener('click', () => {
      popup.remove();
    });

    return {
      popup, taskName, taskDesc, submit,
    };
  }
}
