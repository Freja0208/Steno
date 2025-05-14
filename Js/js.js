




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

// En array med alle quiz-spørgsmålene, deres svarmuligheder og det korrekte svar
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

// Gemmer hvilket spørgsmål vi er på nu
let currentQuestion = 0;

// Antal korrekte svar brugeren har givet
let score = 0;

// Om spørgsmålet er blevet besvaret (forhindrer dobbeltklik)
let answered = false;

// Viser det aktuelle spørgsmål og svarmuligheder
function showQuestion() {
  const q = quiz[currentQuestion];

  // Opdater spørgsmålstitel (f.eks. "Spørgsmål 3")
  document.getElementById("question-title").innerText = `Spørgsmål ${currentQuestion + 1}`;

  // Vis selve spørgsmålet
  document.getElementById("question").innerText = q.question;

  // Ryd gamle svarmuligheder
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // Opret liste til nye svarmuligheder
  const ul = document.createElement("ul");
  ul.className = "option-list";

  // Gennemgå alle svarmuligheder og tilføj dem som klikbare elementer
  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerText = option;
    li.className = "option-item";
    li.onclick = () => checkAnswer(li, option); // Når man klikker, kaldes checkAnswer
    ul.appendChild(li);
  });

  optionsDiv.appendChild(ul);

  // Skjul næste-knappen, indtil der svares
  document.getElementById("next-button").style.display = "none";

  // Vis tilbage-knappen (men handlingen styres i previousQuestion-funktionen)
  const backBtn = document.querySelector(".Tilbage");
  if (backBtn) {
    backBtn.style.display = "inline-block";
  }
}

// Tjekker om svaret er korrekt og låser mulighederne
function checkAnswer(selectedLi, selected) {
  if (answered) return; // Stop hvis der allerede er svaret
  answered = true;

  const correct = quiz[currentQuestion].answer;

  // Hvis korrekt svar, øg score
  if (selected === correct) {
    score++;
  }

  // Gør alle svar "inaktive", så man ikke kan klikke igen
  document.querySelectorAll(".option-item").forEach(li => {
    li.classList.add("disabled");
  });

  // Vis næste-knap
  document.getElementById("next-button").style.display = "inline-block";
}

// Går til næste spørgsmål, eller viser resultat hvis quizzen er slut
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quiz.length) {
    answered = false;
    showQuestion();
  } else {
    showResult();
  }
}

// Tilbage-knap logik:
// - Hvis vi er på første spørgsmål, så gå til startsiden
// - Ellers gå ét spørgsmål tilbage
function previousQuestion() {
  if (currentQuestion === 0) {
    // Første spørgsmål → send brugeren til quiz-startside
    window.location.href = "quiz.html"; // ← Ret hvis din fil hedder noget andet
  } else {
    currentQuestion--;
    answered = false;
    showQuestion();
  }
}

// Viser resultatet ved at sende brugeren til resultat-siden med score som query parameter
function showResult() {
  window.location.href = `resultat.html?score=${score}`;
}

// Når siden er indlæst, vis første spørgsmål
window.onload = showQuestion;

/* Quiz slut */





/*
//forbinder det hele til alle spørgsmålene

function startQuiz() {
  if (players.length >= 1) {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentPlayerIndex", "0");
    window.location.href = "quiz.html";
  }
}

//linker til podie siden
players.slice(0, 3).forEach((p, i) => {
  container.innerHTML += `
    <div data-rank="${i + 1}">
      <img src="css/Avatars/${p.avatar}.png" alt="avatar">
      <strong>${p.score} point</strong>
    </div>
  `;
});*/
