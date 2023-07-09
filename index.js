var board = [                        
  ['-','-','-'],
  ['-','-','-'],
  ['-','-','-']
]

let player = 'X'
let gameOver = false

let cells = [...document.getElementsByTagName('td')]
let gameStatus = document.getElementById('status')
let table = document.querySelector('table')
let restartButton = document.getElementById('restart')

restartButton.addEventListener('click', restart)

cells.forEach(function(cell) {
  cell.addEventListener('click', setCell)
})

function setCell(e) {
  let cell = e.target
  let coords = getCoords(cell.getAttribute('class'))
  let {row, col} = coords

  if (board[row][col] === '-' && !gameOver) {

    if(player === 'X') {
      cell.innerText = 'X'
    } else {
      cell.innerText = 'O'
    }
    switchPlayer()
    gameStatus.innerText = `It's ${player}'s turn`
    refreshBoard(coords, player)
    cell.classList.add('selected')

    if(checkGameOver()) {
      gameOver = true
      switchPlayer()
      gameStatus.innerText = `${player} WIN!!`
      cells.forEach(cell => cell.classList.add('selected'))
      table.classList.add('win')
    }
  }
}

function switchPlayer() {
  if ( player === 'X') {
    player = 'O'
  } else {
    player = 'X'
  }
}

function getCoords(string) {
  let rowAndCol = string.split(' ')
  return {
    row: rowAndCol[0].slice(-1) - 1,
    col: rowAndCol[1].slice(-1) - 1
  }
}

function refreshBoard(coords, player) {
  let {row, col} = coords
  board[row][col] = player
}

function checkGameOver() {
  var row1 = board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== '-'
  var row2 = board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== '-'
  var row3 = board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== '-'
  
  var col1 = board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== '-'
  var col2 = board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== '-'
  var col3 = board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== '-'
  
  var diag1 = board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '-'
  var diag2 = board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== '-'
  
  return row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2
}

function restart() {
  board = [                        
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
  ]
  player = 'X'
  gameOver = false
  gameStatus.innerText = 'Game status'
  cells.forEach(function(cell) {
    cell.innerText = ''
    cell.classList.remove('selected')
  })
  table.classList.remove('win')
}