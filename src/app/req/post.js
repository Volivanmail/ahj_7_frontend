export default async function postFoo() {
  const data = [];
  const taskList = document.querySelectorAll('.li');
  taskList.forEach((el) => {
    data.push({
      id: el.querySelector('.id').textContent,
      name: el.querySelector('.taskName').textContent,
      description: el.querySelector('.taskDesc').textContent,
      status: (() => { if (el.querySelector('.checkbox').checked) { return true; } return false; })(),
      created: el.querySelector('.created').textContent,
    });
  });

  try {
    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const data1 = await response.json();
    console.log('Success:', data1);
  } catch (error) {
    console.error('Error:', error);
  }
}
