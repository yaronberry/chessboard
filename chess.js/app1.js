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

const BOARD_SIZE = 8;
let boardData;
let boardData1;


/* trying to add the letters on the side of the board 
let letters = ['a','b','c','d','e','f','g','h'] ;
for(let letter of letters){
let li = document.createElement('li');
console.log(letter);
const span = document.createElement('span')
document.span.appendChild(letter);
document.li.appendChild(span);

document.body.appendChild(li);
}
*/

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

  isEmpty(row,col){
    return this.getPiece(row,col) === undefined ;
  }
  isPlayer(row,col,player){
    const piece = this.getPiece(row,col);
    if(piece !== undefined && piece.player === player){
      return true ;
    }else{
      return false ;
    }
  }


}
function onCellClick(event, row, col) { // this function make all the "coloring"
  console.log(col);
  console.log(row);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      
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



  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }

  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');

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

  getOpponent(){
    if(this.player === WHITE_PLAYER){
      return DARK_PLAYER ;
    }
    return WHITE_PLAYER ;
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
    let result = [] ;
    let direction = 1 ;
    if (this.player === DARK_PLAYER) {
      direction = -1 ;
    }
    let position = [this.row + direction , this.col];
    if(boardData.isEmpty(position[0],position[1])){
       result.push(position);
    }
    position = [this.row + direction , this.col + direction];
    if(boardData.isPlayer(position[0],position[1] , this.getOpponent())){
      result.push(position);
    }
    position = [this.row + direction , this.col - direction];
    if(boardData.isPlayer(position[0],position[1] , this.getOpponent())){
      result.push(position);
    }
    return result;
  }
   
  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1 , 0 , boardData));
    result = result.concat(this.getMovesInDirection(1 , 0 , boardData));
    result = result.concat(this.getMovesInDirection(0 ,1 , boardData));
    result = result.concat(this.getMovesInDirection(0 ,-1 , boardData));
    return result;
  }
  getMovesInDirection(directionRow, directionCol , boardData){
    let result = [];
    for(let i =1 ; i< BOARD_SIZE ; i++){
      let row = this.row + directionRow * i ;
      let col = this.col + directionCol * i ;
      if(boardData.isEmpty(row,col)){
        result.push([row,col]);  
      }else if (boardData.isPlayer(row,col,this.getOpponent())){
        result.push([row,col]);
        return result;
      }else if (boardData.isPlayer(row,col,this.player)){
      
        return result;
      }
    }

    return result ;
  }
  getkingMoves(boardData) {
    let result = [];
    const relativeMoves = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]] ;
    for(let relativeMove of relativeMoves){
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if(!boardData.isPlayer(row,col,this.player)){
        result.push([row , col]);
      }
    }

    return result
  }

  getKnightMoves(boardData) {
    let result = [];

    const relativeMoves = [[-2,-1], [-1,2], [-1,-2], [1,-2], [-2,1], [2,-1], [1,2], [2,1]] ;
    for(let relativeMove of relativeMoves){
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if(!boardData.isPlayer(row,col,this.player)){
        result.push([row , col]);
      }
    }

    return result
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1 , -1 , boardData));
    result = result.concat(this.getMovesInDirection(-1 , 1 , boardData));
    result = result.concat(this.getMovesInDirection(1 ,1 , boardData));
    result = result.concat(this.getMovesInDirection(1 ,-1 , boardData));
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result =result.concat(this.getRookMoves(boardData));
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
function chessBoard() { // here we created the board
  table = document.createElement('table');
  document.body.appendChild(table);
  table.id = "tb";
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
  boardData = new BoardData(getInitialPieces());
  console.log(boardData);
  for (let piece of boardData.pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);

  }


}

window.addEventListener('load', chessBoard);



//const image = document.createElement('img');
//document.getElementById('tb').rows[5].cells[7].innerHTML= "< img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png'>" ;
//cell.appendChild(image);

