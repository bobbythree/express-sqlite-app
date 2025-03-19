const nameInput = document.getElementById('name-input');
const reasonInput = document.getElementById('reason-input');
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const reason = reasonInput.value;
  console.log("name", name, "reason", reason);

  if (!name || !reason) {
    alert('Please provide both a Name and a Reason');
    return;
  }

  const data = { name: name, reason: reason };
  const url = 'http://127.0.0.1:3000/api';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    nameInput.value = '';
    reasonInput.value = '';

  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
});
