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

class BoardData { //here is the father off all the creation (except the board)
  constructor(pieces) {
    this.pieces = pieces;
  }
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {

        return piece;
      }
    }
  }
}
function onCellClick(event, row, col, cell) { // this function make all the "coloring"
  console.log(col);
  console.log(row);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      
    }
  }
  boardData1 = new BoardData(getInitialPieces());
  const piece = boardData.getPiece(row, col);
  console.log(piece);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();
    console.log(possibleMoves);
    for (const possibleMove of possibleMoves) {
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
      table.rows[possibleMove[0]].cells[possibleMove[1]].addEventListener('click', () => { addImage(table.rows[possibleMove[0]].cells[possibleMove[1]], piece.player, piece.type); });
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
  getPossibleMoves() {  //here we match the possible move to the piece 

    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getkingMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenMoves();
    } else {
      console.log('unknown type', type)
    }
    let absoluteMoves = []; // so after we got the relative move we need to updat to the place of the piece
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
      //relativeMove[0] this one represent first elemet of the first element of the array(1)ex
      //relativeMoves[0]this one represent first elemet of the array([1,0])ex
    }
    let filteredMoves = []; // here we substract all the possibillitis that isnt in the board 
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }

    return filteredMoves; // and we return everything as an array
  }
  getPawnRelativeMoves() {
    if (this.player === DARK_PLAYER) {
      return [[-1, 0]];
    }
    return [[1, 0]];
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
  getkingMoves() {
    let result = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          result.push([i, j]);
        }
      }
    }
    return result
  }

  getKnightMoves() {
    let result = [];

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (i !== j && i !== 0 && j !== 0 && j !== -i && -j !== i) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }

  getBishopMoves() {
    let result = [];
    for (let i = -8; i <= BOARD_SIZE; i++) {
      for (let j = -8; j <= BOARD_SIZE; j++) {
        if (i === j || i === -j || -j === i) {
          if (!(i === 0 && j === 0)) {
            result.push([i, j]);
          }
        }
      }
    }
    return result;
  }

  getQueenMoves() {
    let result = [];
    for (let i = -8; i <= BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
      for (let j = -8; j <= BOARD_SIZE; j++) {
        if (i === j || i === -j || -j === i) {
          if (!(i === 0 && j === 0)) {
            result.push([i, j]);
          }
        }

      }

    }

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

