

//forsiden

//Åbner videoen ved at trykke på et modal(ikonerne)
function openModal(modalId, videoId) {
  document.getElementById(modalId).style.display = "flex";
  document.getElementById(videoId).play(); //afspiller video
}

//lukker videoen ved at trykke på tilbage knap
function closeModal(modalId, videoId) {
  const modal = document.getElementById(modalId); 
  const video = document.getElementById(videoId);//video
  video.pause();
  video.currentTime = 0;
  modal.style.display = "none";
}
/* avatar valg*/

const avatars = document.querySelectorAll('.avatar');
let selectedAvatar = null;

avatars.forEach(avatar => {
  avatar.addEventListener('click', () => {
    avatars.forEach(a => a.classList.remove('selected'));
    avatar.classList.add('selected');
    selectedAvatar = avatar.getAttribute('data-avatar');
  });
});

function startQuiz() {
  if (!selectedAvatar) {
    alert("Vælg en avatar først!");
    return;
  }
  localStorage.setItem("chosenAvatar", `css/Avatars/${selectedAvatar}.png`);
  window.location.href = "sprg1.html"; // Skift til første spørgsmål
}

/*Freja*/
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
    question: "Hvor mange af præventionsmetoderne kræver, at en læge indsætter dem?",
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

// Viser resultatet til sidst
function showResult() {
  const total = quiz.length;
  // Send brugeren til resultat.html og giv score og total med i URL'en
  window.location.href = `resultat.html?score=${score}&total=${total}`;
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

function goBack() {
  if (document.referrer && document.referrer !== window.location.href) {
    // Hvis der er en forrige side, gå tilbage
    window.history.back();
  } else {
    // Ellers send brugeren til startsiden
    window.location.href = "quiz.html";
  }
}

// Når siden er indlæst, vis første spørgsmål
window.onload = showQuestion;

/* Quiz slut */
/*Freja Slut*/

/* Resultatside */
const params = new URLSearchParams(window.location.search);
const resultScore = parseInt(params.get("score")) || 0;
const avatar = localStorage.getItem("chosenAvatar") || "css/Avatars/placeholder.png";

document.getElementById("score-display").innerText = `Din score: ${resultScore} ud af 7`;
document.getElementById("avatar-display").src = avatar;

// Lyd + konfetti
window.addEventListener('load', () => {
  const lyd = document.getElementById("result-sound");
  const knap = document.getElementById("play-sound-btn");

  lyd.play().catch(() => {
    knap.style.display = "inline-block";
  });

  knap.addEventListener("click", () => {
    lyd.play();
    knap.style.display = "none";
  });

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
});

localStorage.removeItem("chosenAvatar");
