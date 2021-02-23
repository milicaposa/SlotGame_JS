// Select buttons
const spinBtn = document.querySelector(".spin-btn");
const betOneBtn = document.querySelector(".bet-one-btn");
const betMaxBtn = document.querySelector(".bet-max-btn");

// Select elements
const betDisplay = document.querySelector(".bet-box");
const paidDisplay = document.querySelector(".paid-box");
const status = document.querySelector("#status");

// Credits
let money = 500;
let bet = 1;

paidDisplay.innerHTML = money;
betDisplay.innerHTML = bet;

function handleBetOne() {
  bet = 1;
  betDisplay.innerHTML = bet;
}

function handleBetMax() {
  bet = 50;
  betDisplay.innerHTML = bet;
}

// Spining
let spinning = false;

function handleSpin() {
  if (spinning) {
    return null;
  }

  spinning = true;
  const numChanges = randomNum(1, 4) * 12;
  const numeberSlot1 = numChanges + randomNum(1, 12);
  const numeberSlot2 = numChanges + 1.5 * 12 + randomNum(1, 12);
  const numeberSlot3 = numChanges + 3 * 12 + randomNum(1, 12);

  let i1 = 0;
  let i2 = 0;
  let i3 = 0;
  let sound = 0;

  status.innerHTML = "Spinning...";
  betOneBtn.disabled = true;
  betMaxBtn.disabled = true;
  spinBtn.disabled = true;

  reel1 = setInterval(spin1, 40);
  reel2 = setInterval(spin2, 40);
  reel3 = setInterval(spin3, 40);

  // Spin reel 1
  function spin1() {
    i1++;

    if (i1 >= numeberSlot1) {
      stopSound[0].play();
      clearInterval(reel1);
      return null;
    }
    slotTile = document.getElementById("reel1");

    if (slotTile.className == "s12") {
      slotTile.className = "s0";
    }
    slotTile.className = "s" + (parseInt(slotTile.className.substring(1)) + 1);
  }

  // Spin reel 2
  function spin2() {
    i2++;

    if (i2 >= numeberSlot2) {
      stopSound[1].play();
      clearInterval(reel2);
      return null;
    }
    slotTile = document.getElementById("reel2");

    if (slotTile.className == "s12") {
      slotTile.className = "s0";
    }
    slotTile.className = "s" + (parseInt(slotTile.className.substring(1)) + 1);
  }

  // Spin reel 3
  function spin3() {
    i3++;

    if (i3 >= numeberSlot3) {
      stopSound[2].play();
      clearInterval(reel3);
      checkIfWon();
      return null;
    }
    slotTile = document.getElementById("reel3");

    if (slotTile.className == "s12") {
      slotTile.className = "s0";
    }
    sound++;
    slotTile.className = "s" + (parseInt(slotTile.className.substring(1)) + 1);
  }
}

// Win / Lose
function checkIfWon() {
  const reel1 = document.getElementById("reel1").className;
  const reel2 = document.getElementById("reel2").className;
  const reel3 = document.getElementById("reel3").className;

  if (
    reel1 === reel2 ||
    reel1 === reel3 ||
    reel2 === reel3 ||
    (reel1 === reel2) === reel3
  ) {
    status.innerHTML = "Congratulations!";
    paidDisplay.innerHTML = money += bet * 2;
    winSound.play();
  } else {
    status.innerHTML = "Better luck next time..";
    paidDisplay.innerHTML = money -= bet;
    loseSound.play();
  }
  spinning = false;
  betOneBtn.disabled = false;
  betMaxBtn.disabled = false;
  spinBtn.disabled = false;
}

// Audio
const stopSound = [
  new Audio("https://milicaposa.github.io/slot-game-js/sounds/stop-sound.wav"),
  new Audio("https://milicaposa.github.io/slot-game-js/sounds/stop-sound.wav"),
  new Audio("https://milicaposa.github.io/slot-game-js/sounds/stop-sound.wav"),
];

const winSound = new Audio(
  "https://milicaposa.github.io/slot-game-js/sounds/win-sound.wav"
);
const loseSound = new Audio(
  "https://milicaposa.github.io/slot-game-js/sounds/lose-sound.wav"
);

let audio = false;

function toggleAudio() {
  if (!audio) {
    audio = !audio;
    for (let x of spin) {
      x.volume = 0.5;
    }
    for (let x of stopSound) {
      x.volume = 0.5;
    }
    winSound.volume = 1.0;
    loseSound.volume = 1.0;
  } else {
    audio = !audio;
    for (let x of spin) {
      x.volume = 0;
    }
    for (let x of stopSound) {
      x.volume = 0;
    }
    winSound.volume = 0;
    loseSound.volume = 0;
  }
}

// Random int function
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
