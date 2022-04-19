
const BOARD_SIZE = 8;
let pieces = [];
const WHITE_PLAYER = 'white' ;
const DARK_PLAYER = 'black';

let table ;

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

class Piece {
    constructor( row,coll,type , player){
        this.row = row ;
        this.coll = coll ;
        this.type = type ;
        this.player= player;
    }
    
}

function getInitialBoard(){
    let result = [];
     addPieces(result,0,WHITE_PLAYER); 
     addPieces(result,7,DARK_PLAYER);
    
     for(let i =0 ; i < 8 ; i++){
      result.push(new Piece(1,i,PAWN,WHITE_PLAYER))
      result.push(new Piece(6,i,PAWN,DARK_PLAYER))
     }
     return result;
    }

function addPieces(result,row,player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, QUEEN, player));
    result.push(new Piece(row, 4, KING, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
  }

  function addImage(cell,player,name){
    Image = document.createElement('img');
    Image.src = 'pieces/' + player + '/' + name + '.png' ;
    cell.appendChild(Image);
}


  pieces= getInitialBoard();
  for(let piece of pieces){
    addImage(table.rows[piece.row].cells[piece.coll],piece.player,piece.type );
      
  }
  

  function chessBoard () {
let table = document.createElement('table');
document.body.appendChild(table);

for(let row= 0; row< BOARD_SIZE; row++){

    const rowElement = table.insertRow(row);

    for(let coll= 0; coll< BOARD_SIZE; coll++){

       const cell = rowElement.insertCell(coll);
    
    
       if((row + coll) % 2 === 0){
           cell.className = 'blackcub' ;
       }else{
        cell.className = 'whitecub' ;
       }
    }

}

pieces= getInitialBoard();
  for(let piece of pieces){
    addImage(table.rows[piece.row].cells[piece.col],piece.player,piece.type );
      
  }
}

window.addEventListener('load',chessBoard);
