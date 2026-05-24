
const squares = document.querySelectorAll(".cell")
const message = document.getElementById("message")
const restartBtn = document.getElementById("reset")

let board = ["", "", "", "", "", "", "", "", ""]
let turn = "X"
let isGameOver = false

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

////////////////////////////////
// Functions
function updateMessage() {
  if (!isGameOver) message.textContent = `Turn: ${turn}`
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.textContent = `${board[a]} Wins!`
      isGameOver = true
      return
    }
  }

  if (!board.includes("")) {
    message.textContent = "It's a Draw!"
    isGameOver = true
  }
}

function handleClick(e) {
  const index = e.target.dataset.index
  if (board[index] !== "" || isGameOver) return

  board[index] = turn
  e.target.textContent = turn
  e.target.classList.add("taken")

  checkWinner()

  if (!isGameOver) {
    turn = turn === "X" ? "O" : "X"
    updateMessage()
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""]
  squares.forEach((sq) => {
    sq.textContent = ""
    sq.classList.remove("taken")
  })
  turn = "X"
  isGameOver = false
  updateMessage()
}

////////////////////////////////
// Event Listeners
squares.forEach((sq) => sq.addEventListener("click", handleClick))
restartBtn.addEventListener("click", resetGame)
updateMessage()


