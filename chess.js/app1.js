let selectedCell;
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

const BOARD_SIZE = 8 ;



function onCellClick(event, row , col){
    console.log(col);
    console.log(row);
    for(let i = 0 ; i< BOARD_SIZE ; i++){
      for(let j = 0 ; j< BOARD_SIZE ; j++){
        table.rows[i].cells[j].classList.remove('possible-move');
      }
    }
    for(let piece of pieces ){
      if(piece.row === row && piece.col ===col){
        let possibleMoves = piece.getPossibleMoves();
       for(const possibleMove of possibleMoves){
       table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
      }
    }
    }
    if(selectedCell !== undefined){
      selectedCell.classList.remove('selected');
    }

    selectedCell=event.currentTarget;
    selectedCell.classList.add('selected');
}

function addImage(cell,player,name){
  const Image = document.createElement('img');
  Image.src = 'pieces/' + player + '/' + name + '.png' ;
  cell.appendChild(Image);
}



class Piece {
    constructor(row,col,type , player){
        this.row=row;
        this.col=col;
        this.type=type;
        this.player=player;
    }
    getPossibleMoves(){
    
    let relativeMoves;
    if(this.type=== PAWN){
      relativeMoves = this.getPawnRelativeMoves();
    }else if(this.type === ROOK){
      relativeMoves = this.getRookRelativeMoves();
    }else if(this.type === KNIGHT){
      relativeMoves = this.getKnightMoves();
    }else if(this.type === BISHOP){
      relativeMoves = this.getBishopMoves();
    }else if(this.type === KING){
      relativeMoves = this.getkingMoves();
    }else if(this.type === QUEEN){
      relativeMoves = this.getQueenMoves();
    }else{
       console.log('unknown type', type)
    }
   let absoluteMoves = [] ;
   for(let relativeMove of relativeMoves ){
     const absoluteRow = this.row + relativeMove[0];
     const absoluteCol = this.col + relativeMove[1];
     absoluteMoves.push([absoluteRow, absoluteCol]); 
   }
      let filteredMoves = [];
      for(let absoluteMove of absoluteMoves){
        const absoluteRow = absoluteMove[0];
        const absoluteCol = absoluteMove[1];
        if(absoluteRow >=0 && absoluteRow <=7 && absoluteCol >= 0 && absoluteCol <= 7 ){
          filteredMoves.push(absoluteMove);
        }
      }
    
    return  filteredMoves ;
  }
    getPawnRelativeMoves(){
      let upOrDown;
      if(this.player===DARK_PLAYER){
        return[[-1,0]];
      }
      return [[1,0]];
    }
     
    getRookRelativeMoves(){
      let result = [];
      for(let i =1 ; i<BOARD_SIZE ; i++){
        result.push([i,0]);
        result.push([-i,0]);
        result.push([0,i]);
        result.push([0,-i]);
      }
      return result ;
    }
    getkingMoves(){
      let result =[];
       for(let i = -1 ; i<=1 ; i++ ){
        for(let j = -1 ; j<=1 ; j++ ){
          if(i!==0 || j!==0){
          result.push([i,j]);
           }
         }
       }
      return result
    }

    getKnightMoves(){
      let result = [];
      
      for(let i = -2 ; i<=2 ; i++){
        for(let j = -2 ; j<=2 ; j++){
        if(i!==j && i!==0 && j!==0 && j!==-i && -j!==i ){ 
            result.push([i,j]);
          }
        }
      }
      return result ;
    }

    getBishopMoves(){
      let result = [];
      for(let i = -8; i<= BOARD_SIZE ; i++){
        for(let j= -8; j<= BOARD_SIZE ; j++){
          if(i===j || i===-j || -j===i) {
          result.push([i,j]);
          }
        }
      }
      return result ;
    }

    getQueenMoves(){
      let result = [];
      for(let i = -8; i<= BOARD_SIZE ; i++){
        result.push([i,0]);
        result.push([-i,0]);
        result.push([0,i]);
        result.push([0,-i]);
        for(let j= -8; j<= BOARD_SIZE ; j++){
         if(i===j || i===-j || -j===i) {
            result.push([i,j]);
            }
       
        }
      }
      return result;
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
  function chessBoard () {
 table = document.createElement('table');
  document.body.appendChild(table);
  table.id = "tb" ;
  for(let row=0 ; row < BOARD_SIZE ; row++ ){
    const rowElement = table.insertRow(row);
    for(let col=0 ; col < BOARD_SIZE ; col++ ){
        const cell = rowElement.insertCell(col);
        cell.id = "cell-" + row.toString() + col.toString();
       
        cell.addEventListener('click',(event) => onCellClick(event, row , col));

        if( (col +row) %2 ===0){
          cell.className = "blackcub" ;    
       }
       else{

          cell.className = "whitecub" ;
           } 
    }
   

  } 
  pieces= getInitialBoard();
  for(let piece of pieces){
    addImage(table.rows[piece.row].cells[piece.col],piece.player,piece.type );
      
  }
  
  
}
  
window.addEventListener('load',chessBoard);
 


//const image = document.createElement('img');
//document.getElementById('tb').rows[5].cells[7].innerHTML= "< img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png'>" ;
//cell.appendChild(image);

