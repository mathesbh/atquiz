const url = "https://localhost:5001/api/questionnaires";

const btnCreate = document.querySelector('#btn-create');
btnCreate.onclick = create => {
  create.preventDefault();

  const form = create.target.parentNode;
  const formData = new FormData(form);

  const title = formData.get('title');
  const user = formData.get('user');

  const quiz = {
    title,
    user
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quiz)
  })
    .then(resp => resp.json())
    .then(data => handleRequest(data))
    .catch(err => console.error(err))
}

const handleRequest = (data) => {
  if (data.status === 400) {
    const { Title, User } = data.errors
    if (Title != undefined) {
      Title.map(e => {
        const errTitle = document.querySelector('#errTitle');
        let p = document.createElement('p');
        p.classList.add('err');
        let text = document.createTextNode(e);
        p.appendChild(text);
        errTitle.appendChild(p);
      });
    }

    if (User != undefined) {
      User.map(e => {
        const errUser = document.querySelector('#errUser')
        let p = document.createElement('p');
        p.classList.add('err');
        let text = document.createTextNode(e);
        p.appendChild(text);
        errUser.appendChild(p);
      });
    }
  } else{
    alert('Pergunta criada com sucesso!');
    return window.location.href = '../index.html';
  }

}