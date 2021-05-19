const url = 'https://localhost:5001/api/questionnaires';

function getQuestionnaries(){
  fetch(url)
    .then(response => response.json())
    .then(data => showQuestionnaries(data))
    .catch(err => console.log(err))
}

getQuestionnaries();

const showQuestionnaries = (data) => {
  const el = document.querySelector('#questionnaries');
  if(data == ''){
    return el.innerHTML = "<h5>Nenhuma pergunta cadastrada</h5>"
  }
  
  data.forEach(element => {
    const tbody = document.querySelector('#tbody');
    const btn = document.createElement('button');
    btn.innerText = 'Responder';
    btn.id = 'btn-answer';
    btn.setAttribute('onclick', `answerQuiz(${element.id})`);
    let title = document.createTextNode(element.title);
    let tr = tbody.insertRow();
    let td1 = tr.insertCell(0);
    td1.appendChild(title);
    let td2 = tr.insertCell(1);
    td2.appendChild(btn);
  });
}

function answerQuiz(id){
  window.location.href = `../src/screens/answers.html?id=${id}`
} 
