




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

function showQuestion() {
  // Vis spørgsmålet
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;

  // Vis mulighederne
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option";
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });

  // Fjern tidligere feedback og "Næste" knap
  const resultDiv = document.getElementById("result");
  const nextButton = document.getElementById("next-button");
  resultDiv.innerHTML = "";
  if (nextButton) nextButton.style.display = "none";  // Skjul Næste knap indtil svar er afgivet
}

function checkAnswer(selected) {
  const correct = quiz[currentQuestion].answer;
  const resultDiv = document.getElementById("result");

  // Vis feedback: korrekt eller forkert
  if (selected === correct) {
    score++;
    resultDiv.innerHTML = `<p style="color: green;">Korrekt!</p>`;
  } else {
    resultDiv.innerHTML = `<p style="color: red;">Forkert! Rigtigt svar: ${correct}</p>`;
  }

  // Vis "Næste" knappen efter svar
  const nextButton = document.getElementById("next-button");
  nextButton.style.display = "inline-block";  // Gør Næste knappen synlig

  // Opdater den globale variable currentQuestion for at gå videre til næste spørgsmål
  currentQuestion++;
}

function nextQuestion() {
  if (currentQuestion < quiz.length) {
    showQuestion();
  } else {
    // Hvis der ikke er flere spørgsmål, vis resultatet
    showResult();
  }
}

function showResult() {
  // Erstat quiz-indhold med resultatet
  document.getElementById("quiz-container").innerHTML =
    `<h2>Du fik ${score} ud af ${quiz.length} rigtige!</h2>`;
}

// Start quizzen
showQuestion();



/*podie siden

    // Alle spillere får point for korrekt svar (bare for demo)
    players.forEach(p => {
      if (selected === correct) {
        p.score += 1;
      }
    });
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    document.getElementById("quiz").style.display = "none";
    showPodium();
  }
  
  function showPodium() {
    document.getElementById("podium").style.display = "block";
    const podiumDiv = document.getElementById("podiumContainer");
  
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const medals = ["🥇", "🥈", "🥉"];
  
    podiumDiv.innerHTML = "";
    sorted.slice(0, 3).forEach((p, i) => {
      podiumDiv.innerHTML += `
        <div style="margin:10px">
          ${medals[i]} <img src="${p.avatar}" width="40"> — ${p.score} point
        </div>
      `;
    });
  }*/
  