
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'black';
let table;
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
const CHESS_BOARD_ID = 'chess-board';
const BOARD_SIZE = 8;
const whichPlayerPopUp_id = 'whichPlayerPopUp';
let selectedPiece;
let game;
const PIECES = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];



function showMovesForPiece(row, col) {

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.allowWhichTurnIsIt(piece);
    for (const possibleMove of possibleMoves) {
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
  }
  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

function onCellClick(row, col) { // this function make all the "coloring"
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    chessBoard(game.boardData);
  } else {
    showMovesForPiece(row, col);
  }
}

function addImage(cell, player, name) { // a function to create and insert the image 
  const Image = document.createElement('img');
  Image.src = 'pieces/' + player + '/' + name + '.png';
  Image.draggable = false;
  cell.appendChild(Image);
}
function initGame() {
  game = new Game(WHITE_PLAYER);
  chessBoard(game.boardData);
  
 //game.boardData.listOfTheEatenPieces = undefined;
  
 
}


function chessBoard(boardData) { // here we created the board

  deletingPlayerTurn();
  const whichPlayerPopUp = document.createElement('div');
  whichPlayerPopUp.id = 'whichPlayerPopUp';
  whichPlayerPopUp.textContent = game.currentPlayer + ' turn ';
  whichPlayerPopUp.classList.add('whichPlayerPopUp');
  document.body.appendChild(whichPlayerPopUp);



  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    table.remove();
  }


  table = document.createElement('table');
  document.body.appendChild(table);
  table.id = CHESS_BOARD_ID;
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow(row);
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell(col);
      cell.id = "cell-" + row.toString() + col.toString();

      cell.addEventListener('click', () => onCellClick(row, col, cell));

      if ((col + row) % 2 === 0) {
        cell.className = "blackcub";
      }
      else {

        cell.className = "whitecub";
      }
    }
  }
  for (let piece of boardData.pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);

  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    let th = document.createElement('th')
    th.id = 'th' + i.toString();
    table.appendChild(th);
  }
  for (let i = 0; i < 8; i++) {
    document.getElementById('th' + i.toString()).innerHTML = letters[i];
  }



  if (game.winner !== undefined) {
    const winnerPopUp = document.createElement('div');
    const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
    winnerPopUp.textContent = winner + 'player wins';
    winnerPopUp.classList.add('winner-dialog');
    table.appendChild(winnerPopUp);
  }



}




//window.addEventListener('load', initGame);
window.addEventListener('load', basicChessBoard);



function deletingPlayerTurn() {
  let whichPlayerPopUpCleaner = document.getElementById('whichPlayerPopUp');
  if (whichPlayerPopUpCleaner !== null) {
    whichPlayerPopUpCleaner.remove();
  }
}


function basicChessBoard() {



  table = document.createElement('table');
  document.body.appendChild(table);
  table.id = CHESS_BOARD_ID;
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow(row);
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell(col);
      cell.id = "cell-" + row.toString() + col.toString();

      cell.addEventListener('click', () => onCellClick(row, col, cell));

      if ((col + row) % 2 === 0) {
        cell.className = "blackcub";
      }
      else {

        cell.className = "whitecub";
      }
    }
  }

  document.getElementById("playButton").addEventListener('click', initGame);
}



function checkIfCheck(){
  let piecesPreviousPlayer = [];
  for(let piece of game.boardData.pieces){
    if(piece.getOpponent() === game.currentPlayer){
      piecesPreviousPlayer.push(piece);
    }
  }



  let result = [];
  for(let piece of piecesPreviousPlayer){
    result = result.concat(piece.getPossibleMoves(game.boardData));
  }

  let kingLocation ;
  for(let location of game.boardData.pieces){
    if(location.type === KING && location.player === currentPlayer){
      kingLocation = [location.row ,location.col];
    }
  }
  
}