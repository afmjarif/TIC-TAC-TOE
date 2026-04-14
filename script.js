const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");
const matchInfo = document.getElementById("matchInfo");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const modeSelect = document.getElementById("mode");

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

const winLine = document.getElementById("winLine");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const dScoreEl = document.getElementById("dScore");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = false;

let player1 = "Player 1";
let player2 = "Player 2";

let score = { x: 0, o: 0, d: 0 };

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// 🎯 START GAME
startBtn.onclick = () => {
  player1 = document.getElementById("player1").value || "Player 1";

  if (modeSelect.value === "pvp") {
    player2 = document.getElementById("player2").value || "Player 2";
  } else {
    player2 = "Computer";
  }

  resetGame(true);

  currentPlayer = Math.random() < 0.5 ? "X" : "O";

  matchInfo.textContent = `${player1} (X) vs ${player2} (O)`;
  statusText.textContent = `${getName()} starts!`;

  gameActive = true;

  if (isCPU() && currentPlayer === "O") {
    setTimeout(cpuMove, 500);
  }
};

// 🧱 BOARD
function createBoard() {
  boardDiv.innerHTML = "";
  board.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.onclick = handleMove;
    boardDiv.appendChild(cell);
  });

  winLine.style.width = "0px";
}

// 🎮 MOVE
function handleMove(e) {
  const i = e.target.dataset.index;

  if (!gameActive || board[i]) return;

  playMove(i, currentPlayer);
  clickSound.play();

  if (checkWin(currentPlayer)) {
    endGame(`${getName()} wins! 🏆`, currentPlayer);
    return;
  }

  if (!board.includes("")) {
    endGame("Draw 🤝", "d");
    return;
  }

  switchPlayer();

  if (isCPU() && currentPlayer === "O") {
    setTimeout(cpuMove, 300);
  }
}

// 🎯 MOVE
function playMove(i, p) {
  board[i] = p;
  document.querySelectorAll(".cell")[i].textContent = p;
}

// 👤 NAME
function getName() {
  return currentPlayer === "X" ? player1 : player2;
}

// 🔁 SWITCH
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${getName()}'s turn`;
}

// 🏆 WIN CHECK + LINE
function checkWin(p) {
  for (let pattern of winPatterns) {
    if (pattern.every(i => board[i] === p)) {

      pattern.forEach(i => {
        document.querySelectorAll(".cell")[i].classList.add("win");
      });

      drawWinLine(pattern);
      return true;
    }
  }
  return false;
}

// 🎯 WIN LINE FIXED
function drawWinLine(pattern) {
  const cells = document.querySelectorAll(".cell");
  const boardRect = boardDiv.getBoundingClientRect();

  const first = cells[pattern[0]].getBoundingClientRect();
  const last = cells[pattern[2]].getBoundingClientRect();

  const x1 = first.left + first.width / 2 - boardRect.left;
  const y1 = first.top + first.height / 2 - boardRect.top;

  const x2 = last.left + last.width / 2 - boardRect.left;
  const y2 = last.top + last.height / 2 - boardRect.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  winLine.style.width = length + "px";
  winLine.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
}

// 🔊 END GAME + SCORE + 🎉 CONFETTI
function endGame(msg, type) {
  gameActive = false;
  statusText.textContent = msg;

  winSound.play();

  if (type === "X") score.x++;
  else if (type === "O") score.o++;
  else score.d++;

  updateScore();

  if (type === "X" || type === "O") {
    launchConfetti();
  }
}

// 📊 SCORE
function updateScore() {
  xScoreEl.textContent = score.x;
  oScoreEl.textContent = score.o;
  dScoreEl.textContent = score.d;
}

// 🤖 CPU (simple)
function isCPU() {
  return modeSelect.value !== "pvp";
}

function cpuMove() {
  let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  let move = empty[Math.floor(Math.random()*empty.length)];

  playMove(move, "O");

  clickSound.play();

  if (checkWin("O")) {
    endGame("Computer wins 🤖", "O");
    return;
  }

  if (!board.includes("")) {
    endGame("Draw 🤝", "d");
    return;
  }

  switchPlayer();
}

// 🔄 RESTART FIXED
restartBtn.onclick = () => {
  resetGame(false);
  gameActive = true;
  statusText.textContent = `${getName()}'s turn`;
};

// ♻️ RESET
function resetGame(full) {
  board = Array(9).fill("");
  createBoard();
  winLine.style.width = "0px";

  if (full) {
    statusText.textContent = "";
  }
}

// 🎉 CONFETTI
function launchConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      spread: 80,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}