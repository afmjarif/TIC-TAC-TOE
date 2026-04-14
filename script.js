let mode="";
let p1="Player X", p2="Player O";
let board=[];
let current="X";
let active=false;

const win=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

// SCREEN SWITCH
function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// MODE
function selectMode(m){
  mode=m;
  show("nameScreen");

  document.getElementById("title").innerText =
    m==="multi" ? "Enter Player Names" : "Enter Your Name";

  document.getElementById("inputs").innerHTML =
    m==="multi"
    ? `<input id="a" placeholder="Player 1">
       <input id="b" placeholder="Player 2">`
    : `<input id="a" placeholder="Your Name">`;
}

// START GAME
function startGame(){
  p1=document.getElementById("a").value||"Player X";
  p2=mode==="multi"
    ? (document.getElementById("b").value||"Player O")
    : "Computer";

  board=Array(9).fill("");
  current="X";
  active=true;

  show("gameScreen");

  document.getElementById("match").innerText =
    `${p1} (X) VS ${p2} (O)`;

  draw();
}

// DRAW BOARD
function draw(){
  const b=document.getElementById("board");
  b.innerHTML="";

  document.querySelector(".winLine")?.remove();

  board.forEach((v,i)=>{
    const d=document.createElement("div");
    d.className="cell";
    d.innerText=v;
    d.onclick=()=>move(i,d);
    b.appendChild(d);
  });

  update();
}

// MOVE
function move(i,el){
  if(!active||board[i]) return;

  board[i]=current;
  el.innerText=current;

  let combo=getWin();

  if(combo){
    drawWinLine(combo);
    winEffect();
    document.getElementById("status").innerHTML =
      `<div class="winText">${current==="X"?p1:p2} Wins! 🎉</div>`;
    active=false;
    return;
  }

  if(!board.includes("")){
    document.getElementById("status").innerText="Draw 🤝";
    active=false;
    return;
  }

  current=current==="X"?"O":"X";
  update();

  if(mode==="cpu" && current==="O"){
    setTimeout(cpu,400);
  }
}

// CPU
function cpu(){
  let empty=[];
  board.forEach((v,i)=>!v&&empty.push(i));
  let pick=empty[Math.floor(Math.random()*empty.length)];
  move(pick,document.querySelectorAll(".cell")[pick]);
}

// WIN CHECK
function getWin(){
  for(let w of win){
    let [a,b,c]=w;
    if(board[a]&&board[a]===board[b]&&board[a]===board[c]){
      return w;
    }
  }
  return null;
}

// WIN LINE
function drawWinLine(combo){
  const boardEl=document.getElementById("board");
  const cells=document.querySelectorAll(".cell");

  const a=cells[combo[0]].getBoundingClientRect();
  const c=cells[combo[2]].getBoundingClientRect();
  const bRect=boardEl.getBoundingClientRect();

  const x1=a.left+a.width/2-bRect.left;
  const y1=a.top+a.height/2-bRect.top;

  const x2=c.left+c.width/2-bRect.left;
  const y2=c.top+c.height/2-bRect.top;

  const len=Math.hypot(x2-x1,y2-y1);
  const angle=Math.atan2(y2-y1,x2-x1)*180/Math.PI;

  const line=document.createElement("div");
  line.className="winLine";

  line.style.width=len+"px";
  line.style.left=x1+"px";
  line.style.top=y1+"px";
  line.style.transform=`rotate(${angle}deg)`;

  boardEl.appendChild(line);
}

// WIN EFFECT
function winEffect(){
  document.getElementById("gameScreen").classList.add("shake");

  setTimeout(()=>{
    document.getElementById("gameScreen").classList.remove("shake");
  },500);

  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}

// UPDATE
function update(){
  document.getElementById("status").innerText=
  `${current==="X"?p1:p2}'s turn (${current})`;
}

// RESET
function resetGame(){
  startGame();
}

// HOME
function goHome(){
  active=false;
  board=[];
  current="X";
  document.querySelector(".winLine")?.remove();
  show("modeScreen");
}
