




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
