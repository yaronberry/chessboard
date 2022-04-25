let selectedCell;
let pieces = [];
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
let boardData;
let boardData1;
let selectedPiece;

//trying to add the letters on the side of the board 
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
for (let letter of letters) {
  let li = document.createElement('li');
  li.innerHTML = letter;
  console.log(letter);
  document.body.appendChild(li);
}


class BoardData { //here is the father off all the creation (except the board)
  constructor(pieces) {
    this.pieces = pieces;
  }
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        console.log(piece);
        return piece;
      }
    }
  }

  isEmpty(row, col) {  //here its return a true or false 
    return this.getPiece(row, col) === undefined;
  }
  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    if (piece !== undefined && piece.player === player) {
      return true;
    } else {
      return false;
    }
  }
  removePiece(row,col){
    for(let i = 0; i < this.pieces.length; i++ ){
      const piece = this.pieces[i] ;
      if(piece.row === row && piece.col === col){
        this.pieces.splice(i, 1); // a function that delete a piece in this index 
      }
    }
  }
}
function showMovesForPiece(row, col) {

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  const piece = boardData.getPiece(row, col);
  console.log(piece);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    console.log(possibleMoves);
    for (const possibleMove of possibleMoves) {
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
  }
  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

function onCellClick(event, row, col) { // this function make all the "coloring"
  console.log(col);
  console.log(row);
  if (selectedPiece === undefined) {
    showMovesForPiece(row, col);
  } else {
    if (tryMove(selectedPiece, row, col)) {
      selectedPiece = undefined;
      chessBoard(boardData);
    } else {
      showMovesForPiece(row, col);
    }
  }
}

function tryMove(piece, row, col) {
  const possibleMoves = piece.getPossibleMoves(boardData);
  for(const possibleMove of possibleMoves){
    if(possibleMove[0] === row && possibleMove[1] === col){
      boardData.removePiece(row,col);
      piece.row = row ;
      piece.col = col ;
      return true ;
    }
  }
  return false ;
}

function addImage(cell, player, name) { // a function to create and insert the image 
  const Image = document.createElement('img');
  Image.src = 'pieces/' + player + '/' + name + '.png';
  cell.appendChild(Image);
}



class Piece { // a class to represant the making of the pieces + how they "act"
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return DARK_PLAYER;
    }
    return WHITE_PLAYER;
  }


  getPossibleMoves(boardData) {  //here we match the possible move to the piece 

    let Moves;
    if (this.type === PAWN) {
      Moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      Moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      Moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      Moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      Moves = this.getkingMoves(boardData);
    } else if (this.type === QUEEN) {
      Moves = this.getQueenMoves(boardData);
    } else {
      console.log('unknown type', type)
    }


    let filteredMoves = []; // here we substract all the possibillitis that isnt in the board 
    for (let absoluteMove of Moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }

    return filteredMoves; // and we return everything as an array
  }
  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === DARK_PLAYER) {
      direction = -1;
    }
   // let firstTurn = 0 ;        trying to add the 2 step 
   // if(this.row ===1){
   //   firstTurn = 1 ;
   // } 
  //  if(this.row ===6){
    //  firstTurn = 0 ;
     
   // } 
    let position = [this.row + direction , this.col];

   // if (boardData.isEmpty(position[0] , position[1])) {
     // if(this.player === WHITE_PLAYER){
      //let t = this.row + 1 ;
      //}else{ let t = this.row - 1 ;}
      //let col = this.col + 0 ;
      //console.log([t, col])
      //position = [t ,col],
        //result.push(position);
    
  //}
    
    if (boardData.isEmpty(position[0], position[1])) {
     
      result.push(position);
    
    }
    position = [this.row + direction, this.col + direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }
    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }
    return result;
  }

  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    return result;
  }
  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        result.push([row, col]);
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {

        return result;
      }
    }

    return result;
  }
  getkingMoves(boardData) {
    let result = [];
    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }

    return result
  }

  getKnightMoves(boardData) {
    let result = [];

    const relativeMoves = [[-2, -1], [-1, 2], [-1, -2], [1, -2], [-2, 1], [2, -1], [1, 2], [2, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }

    return result
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result = result.concat(this.getRookMoves(boardData));
    return result;

  }
}

function getInitialPieces() { // here we create an object for every pieces
  let result = [];
  addPieces(result, 0, WHITE_PLAYER);
  addPieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER))
    result.push(new Piece(6, i, PAWN, DARK_PLAYER))
  }
  return result;
}

function addPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, QUEEN, player));
  result.push(new Piece(row, 4, KING, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

function initGame(){
  boardData = new BoardData(getInitialPieces());
  chessBoard(boardData);
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

      cell.addEventListener('click', (event) => onCellClick(event, row, col, cell));

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


}

window.addEventListener('load', initGame);



//const image = document.createElement('img');
//document.getElementById('tb').rows[5].cells[7].innerHTML= "< img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png'>" ;
//cell.appendChild(image);
