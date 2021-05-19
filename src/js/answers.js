const id = location.search.split('=')[1];
const questionnaireId = parseInt(id);
const urlGetQuiz = 'https://localhost:5001/api/questionnaires';
const urlPostAnswers = 'https://localhost:5001/api/answers';
let latitude = null;
let longitude = null;

function getQuiz(){
  fetch(`${urlGetQuiz}/${questionnaireId}`)
    .then(res => res.json())
    .then(data => showQuiz(data))
    .catch(err => console.error(err))
}

getQuiz()

const showQuiz = (data) => {
  const el = document.querySelector('#quiz');
  el.innerHTML = `${data.title}`;
}

const btnAnswer = document.querySelector('#btn-answer');
btnAnswer.onclick = resp => {
  resp.preventDefault();
  
  const form = resp.target.parentNode;
  const formData = new FormData(form);
  const response = formData.get('response');

  const answer = {
    latitude,
    longitude,
    response,
    questionnaireId,
  }

  fetch(urlPostAnswers, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answer)
  })
    .then(resp => resp.json())
    .then(data => handleRequest(data))
    .catch(err => console.error(err))
}

if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(function(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
}

const handleRequest = (data) => {
  if (data.status === 400) {
    const { Response } = data.errors
    if (Response != undefined) {
      Response.map(e => {
        const errResponse = document.querySelector('#errResponse');
        let p = document.createElement('p');
        p.classList.add('err');
        let text = document.createTextNode(e);
        p.appendChild(text);
        errResponse.appendChild(p);
      });
    }
  } else{
    alert('Resposta criada com sucesso!');
    return window.location.href = '../index.html';
  }
}