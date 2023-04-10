export default async function delFoo(el) {
  try {
    const response = await fetch(`http://localhost:8080/${el.parentElement.querySelector('.id').textContent}`, {
      method: 'DELETE',
    });
    const data1 = await response.json();
    console.log('Success:', data1);
  } catch (error) {
    console.error('Error:', error);
  }
}
