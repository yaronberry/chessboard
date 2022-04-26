
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'black';
let table;
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
const CHESS_BOARD_ID = 'chess-board' ;
const BOARD_SIZE = 8;

let selectedPiece;
let game ;
const PIECES = [ROOK ,KNIGHT ,BISHOP ,QUEEN ,KING ,BISHOP ,KNIGHT ,ROOK  ];
//trying to add the letters on the side of the board 

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

function onCellClick( row, col) { // this function make all the "coloring"

  if (selectedPiece !== undefined  && game.tryMove(selectedPiece, row, col))   {
    selectedPiece = undefined;
    chessBoard(game.boardData);
  } else {
    showMovesForPiece(row, col);
  }
}

function addImage(cell, player, name) { // a function to create and insert the image 
  const Image = document.createElement('img');
  Image.src = 'pieces/' + player + '/' + name + '.png';
  cell.appendChild(Image);
}
function initGame(){
  game = new Game(WHITE_PLAYER);
  chessBoard(game.boardData);
}

function chessBoard(boardData) { // here we created the board
  
   table = document.getElementById(CHESS_BOARD_ID);
   if(table !== null ){
      table.remove();
   }


  table = document.createElement('table');
  document.body.appendChild(table);
  table.id = CHESS_BOARD_ID ;
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
  
    
    for(let i= 0; i < BOARD_SIZE; i++){
     let th =document.createElement('th')
     th.id = 'th' + i.toString();
      table.appendChild(th);
    }
     for(let i = 0;i<8 ;i++ ){
     document.getElementById('th'+ i.toString()).innerHTML = letters[i] ;
     }
    

}

window.addEventListener('load', initGame);



//const image = document.createElement('img');
//document.getElementById('tb').rows[5].cells[7].innerHTML= "< img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png'>" ;
//cell.appendChild(image);



