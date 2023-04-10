export default async function putFoo(el) {
  const data = {
    id: el.parentElement.querySelector('.id').textContent,
    name: el.parentElement.querySelector('.taskName').textContent,
    description: el.parentElement.querySelector('.taskDesc').textContent,
    status: (() => { if (el.parentElement.querySelector('.checkbox').checked) { return true; } return false; })(),
    created: el.parentElement.querySelector('.created').textContent,
  };

  try {
    const response = await fetch('http://localhost:8080/', {
      method: 'PUT',
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
