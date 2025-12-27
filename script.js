const WORD = "SUSMITHA";
const CODE = "0399";

/* 8×8 GRID (STRAIGHT DIAGONAL SOLUTION) */
const GRID = [
  ["Q","R","S","U","S","M","I","A"],
  ["W","Q","R","S","U","S","H","H"],
  ["E","W","Q","R","S","T","I","A"],
  ["R","E","W","Q","I","M","T","Q"],
  ["T","R","E","M","U","I","Q","Q"],
  ["Y","T","S","M","I","Q","Q","Q"],
  ["U","U","I","T","Q","Q","Q","Q"],
  ["S","H","A","Q","Q","Q","Q","Q"]
];

const gridEl = document.getElementById("grid");
const codeBox = document.getElementById("codeBox");
const continueBtn = document.getElementById("continueBtn");
const resetBtn = document.getElementById("resetBtn");
const celebration = document.getElementById("celebration");

let selected = [];

/* ---------- BUILD GRID ---------- */
GRID.forEach((row, r) => {
  row.forEach((letter, c) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = letter;
    cell.dataset.row = r;
    cell.dataset.col = c;

    /* CLICK / TAP ONLY */
    cell.addEventListener("click", () => handleClick(cell));

    gridEl.appendChild(cell);
  });
});

/* ---------- CLICK HANDLER ---------- */
function handleClick(cell) {
  if (selected.includes(cell)) return;
  if (selected.length >= WORD.length) return;

  select(cell);

  if (selected.length === WORD.length) {
    validate();
  }
}

/* ---------- SELECTION ---------- */
function select(cell) {
  selected.push(cell);
  cell.classList.add("selected");
}

function clearSelection() {
  selected.forEach(c => c.classList.remove("selected"));
  selected = [];
}

/* ---------- VALIDATION ---------- */
function validate() {
  if (selected.length !== WORD.length || !isStraightLine()) {
    return wrong();
  }

  const text = selected.map(c => c.textContent).join("");
  const reversed = text.split("").reverse().join("");

  if (text === WORD || reversed === WORD) {
    success();
  } else {
    wrong();
  }
}

function isStraightLine() {
  const rows = selected.map(c => +c.dataset.row);
  const cols = selected.map(c => +c.dataset.col);

  const sameRow = rows.every(r => r === rows[0]);
  const sameCol = cols.every(c => c === cols[0]);
  const diag1 = rows.every((r, i) => r - rows[0] === cols[i] - cols[0]);
  const diag2 = rows.every((r, i) => r - rows[0] === -(cols[i] - cols[0]));

  return sameRow || sameCol || diag1 || diag2;
}

/* ---------- SUCCESS ---------- */
function success() {
  codeBox.classList.remove("hidden");
  continueBtn.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  emojiRain();
}

/* ---------- WRONG ---------- */
function wrong() {
  gridEl.classList.add("shake");
  setTimeout(() => {
    gridEl.classList.remove("shake");
    clearSelection();
  }, 400);
}

/* ---------- RESET ---------- */
resetBtn.addEventListener("click", () => {
  clearSelection();
  codeBox.classList.add("hidden");
  continueBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  celebration.innerHTML = "";
});

/* ---------- EMOJI CELEBRATION ---------- */
function emojiRain() {
  const emojis = ["🎉","🎊","✨","🥳"];
  const start = Date.now();
  const timer = setInterval(() => {
    if (Date.now() - start > 2500) {
      clearInterval(timer);
      return;
    }
    const e = document.createElement("div");
    e.className = "emoji";
    e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    e.style.left = Math.random() * 100 + "vw";
    celebration.appendChild(e);
    setTimeout(() => e.remove(), 3000);
  }, 150);
}
