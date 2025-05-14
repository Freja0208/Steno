




/* quiz spiller points*/

let players = [];
let selectedAvatar = null;

document.querySelectorAll('.avatar-option').forEach(img => {
  img.addEventListener('click', () => {
    // Marker valgt avatar
    document.querySelectorAll('.avatar-option').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    selectedAvatar = img.dataset.avatar;
  });
});

function addPlayer() {
  if (!selectedAvatar) {
    alert("Vælg en avatar");
    return;
  }

  if (players.length >= 5) {
    alert("Maks. 5 deltagere");
    return;
  }

  if (players.some(p => p.avatar === selectedAvatar)) {
    alert("Denne avatar er allerede valgt");
    return;
  }

  players.push({ avatar: selectedAvatar, score: 0 });
  updatePlayersList();

  selectedAvatar = null;
  document.querySelectorAll('.avatar-option').forEach(i => i.classList.remove('selected'));
}

function updatePlayersList() {
  const list = document.getElementById('playersList');
  list.innerHTML = '<h3>Deltagere:</h3>';
  players.forEach(p => {
    list.innerHTML += `<div><img src="${p.avatar}" width="30" /></div>`;
  });
}

function startQuiz() {
  if (players.length < 2) {
    alert("Minimum 2 deltagere");
    return;
  }
  
  // Start quizzen – fx vis første spørgsmål
  console.log("Quiz starter:", players);
}

/* Quiz start */
const quiz = [
  {
    question: "Hvor mange forskellige hormon præventioner har du fået vist i dag?",
    options: ["6", "7", "8"],
    answer: "7"
  },
  {
    question: "Hvilken bivirkning er ved 6 ud af 7 præventioner?",
    options: ["Humørsvinger", "Hovedpine", "Akne"],
    answer: "Humørsvinger"
  },
  {
    question: "Hvilken prævention er 99.9% sikker?",
    options: ["P-pille", "P-plaster", "P-stav"],
    answer: "P-stav"
  },
  {
    question: "Hvad er det for et hormon der er i alle præventioner?",
    options: ["Østrogen", "Gestagen", "Begge"],
    answer: "Gestagen"
  },
  {
    question: "Hvad bliver slimen i livmoderhalsen?",
    options: ["Tyndere", "Tykkere", "Ingen af delene"],
    answer: "Tykkere"
  },
  {
    question: "Hvor mange former skal indtages som pille?",
    options: ["3", "1", "2"],
    answer: "2"
  },
  {
    question: "Hvor mange af præventionerne skal en læge indsætte præventionen?",
    options: ["3", "4", "2"],
    answer: "3"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  answered = false;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option";
    btn.onclick = () => checkAnswer(btn, option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("next-button").style.display = "none";
}

function checkAnswer(button, selected) {
  if (answered) return;
  answered = true;

  const correct = quiz[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
  document.getElementById("next-button").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quiz.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").innerHTML =
    `<h2>Du fik ${score} ud af ${quiz.length} rigtige!</h2>`;
}

window.onload = showQuestion;




