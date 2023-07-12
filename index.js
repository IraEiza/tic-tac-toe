// Seleccionamos los elementos del DOM que vamos a necesitar
let cells = [...document.getElementsByTagName('td')] // getElementsByTagName devuelve un HTMLCollection, que no admite los métodos de array como el forEach. Para convertirlo en un array podemos usar el spread operator (...) o directamente document.querySelectorAll('td[class^=col]')
let gameStatus = document.getElementById('status')
let table = document.querySelector('table')
let restartButton = document.getElementById('restart')

// Definimos las variables que vamos a necesitar
var board = [                        
  ['-','-','-'],
  ['-','-','-'],
  ['-','-','-']
]

let player = 'X'
let isGameOver = false
let turn = 1

// Aplicamos el addEventListener al botón de reinicio
restartButton.addEventListener('click', restart)

// Aplicamos el addEventListener a cada una de las celdas para que al hacer click sobre ellas se ejecute la función setCell
cells.forEach(function(cell) {
  cell.addEventListener('click', setCell)
})

function setCell(e) {
  // e.target nos devuelve el elemento donde se produce el evento (la celda donde hemos hecho click)
  let cell = e.target
  // Obtenemos las coordenadas a través de las clases que asignamos en el html a los td (col1, col2, col3) y los tr (row1, row2, row3). className nos devuelve la clase que tiene la celda en forma de string, y el slice(-1) se queda con el último caracter. 
  // Tenemos que restarle 1 para que las coordenadas de la tabla coincidan con los de la variable board (recordemos que JavaScript empieza a contar desde 0, para él son las columnas 0, 1 y 2)
  let col = cell.className.slice(-1) - 1
  let row = cell.parentNode.className.slice(-1) - 1
  // Si el tablero está vacío y NO se ha producido el game over, entonces podemos poner un X u O en esa celda
  if (board[row][col] === '-' && !isGameOver) {
    // A la celda se le asigna el símbolo del jugador (X u O)
    cell.innerText = player
    // Actualizamos las variables internas del juego (turno, jugador, board...)
    updateGame(cell, col, row, player)
    // Si alguien gana, se ejecuta la función de victoria (está más abajo)
    if(checkWin(cell, player)) {
      playerWins()
    }
    // Si hay empate, se ejecuta la función de game over (está más abajo)
    if(!checkWin(cell, player) && turn > 9) {
      gameOver()
    }
  }
}

function updateGame(cell, col, row, player) {
  // Cambiamos el jugador
  switchPlayer()
  // Añadimos la clase "selected" a la celda para que no se ponga rosa al pasar el ratón por encima (consultar css -->)
  cell.classList.add('selected')
  // Indica el turno y a quién le toca jugar
  gameStatus.innerText = `Turn ${turn}:  ${player} plays`
  // Actualizamos la variable "board" que representa el tablero
  board[row][col] = player
  // Sumamos 1 turno más
  turn++
}

// Intercambia el jugador
function switchPlayer() {
  if ( player === 'X') {
    player = 'O'
  } else {
    player = 'X'
  }
}

// Comprueba si alguien ha ganado
function checkWin() {
  // Comprueba 3 en línea en horizontal
  var row1 = board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== '-'
  var row2 = board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== '-'
  var row3 = board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== '-'
  // Comprueba 3 en línea en vertical
  var col1 = board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== '-'
  var col2 = board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== '-'
  var col3 = board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== '-'
  // Comprueba 3 en línea en diagonal
  var diag1 = board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '-'
  var diag2 = board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== '-'
  // Si se ha detectado 3 en línea devuelve true, si no false
  return row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2
}

// Si alguien ha ganado...
function playerWins() {
  isGameOver = true
  switchPlayer()
  gameStatus.innerText = `${player} WIN!!`
  cells.forEach(cell => cell.classList.add('selected'))
  table.classList.add('win')
}

// Si hay empate...
function gameOver() {
  isGameOver = true
  gameStatus.innerText = "GAME OVER"
  table.classList.add('loose')
}

// Reseteamos las variables
function restart() {
  // Devolvemos el tablero y el resto de variables internas al estado inicial
  board = [                        
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
  ]
  player = 'X'
  isGameOver = false
  turn = 1
  // Reseteamos el mensaje sobre el tablero
  gameStatus.innerText = 'Game status'
  // Quitamos los símbolos X y O y quitamos la clase "selected" a todas las celdas para restablecer el efecto del hover
  cells.forEach(function(cell) {
    cell.innerText = ''
    cell.classList.remove('selected')
  })
  // Quitamos la clase win o loose al tablero para devolverle el color original
  table.classList.remove('win')
  table.classList.remove('loose')
}