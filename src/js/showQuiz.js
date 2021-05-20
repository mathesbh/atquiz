const id = location.search.split('=')[1];
const questionnaireId = parseInt(id);
const url = 'https://atquiz-api.herokuapp.com/api/answers/questionnaires';
const urlQuiz = 'https://atquiz-api.herokuapp.com/api/questionnaires/';

function getQuestionnaries() {
  fetch(urlQuiz + id)
    .then(response => response.json())
    .then(data => handlerShowQuiz(data))
    .catch(err => console.log(err))
}

getQuestionnaries();

function handlerShowQuiz(data) {
  const el = document.querySelector('#showQuiz')
  const h4 = document.createElement('h4');
  const titleQuiz = document.createTextNode(`Pergunta: ${data.title}`);
  h4.appendChild(titleQuiz);
  const p = document.createElement('p');
  const userQuiz = document.createTextNode(`Usuário: ${data.user}`);
  p.appendChild(userQuiz);
  el.appendChild(h4);
  el.appendChild(p);
}

function getAnswer() {
  fetch(`${url}/${questionnaireId}`)
    .then(res => res.json())
    .then(data => showAnswer(data))
    .catch(err => console.error(err))
}

getAnswer()

const showAnswer = (data) => {
  const el = document.querySelector('#showAnswers')
  if (data == '') {
    el.innerHTML = `<h4>Nenhuma resposta para essa pergunta</h4>`
  } else {
    data.map(e => {
      const h4 = document.createElement('h4');
      const response = document.createTextNode(`Resposta: ${e.response}`);
      h4.appendChild(response);
      const p = document.createElement('p');
      const location = document.createTextNode(`Latitude: ${e.latitude} e Longitude: ${e.longitude}`);
      p.appendChild(location);
      el.appendChild(h4);
      el.appendChild(p);
    });
  }
}

const btnAnswer = document.querySelector('#btn-answer');
btnAnswer.onclick = resp => {
  resp.preventDefault();
  answerQuiz(id);
}

function answerQuiz(id) {
  window.location.href = `../screens/answers.html?id=${id}`;
}