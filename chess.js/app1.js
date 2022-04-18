let selectedCell;
let pieces = [];
const WHITE_PLAYER = 'white' ;
const DARK_PLAYER = 'black';

function onCellClick(e){
    
    if(selectedCell !== undefined){
      selectedCell.classList.remove('selected');
    }

    selectedCell=e.currentTarget;
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
    let result = [];
    if(this.type=== "pawn"){
      let possibleMoves = this.getPawnMoves();
      for(let i =0; i <possibleMoves.length ; i++){
      possibleMoves[i][0] += this.row;
      possibleMoves[i][i] += this.col;
      }
    }
    return result ;
  }
    getPawnMoves(){
      return [[0,1]];
    }
    
  }

function getInitialBoard(){
let result = [];
 addPieces(result,0,WHITE_PLAYER);
 addPieces(result,7,DARK_PLAYER);

 for(let i =0 ; i < 8 ; i++){
  result.push(new Piece(1,i,'pawn',WHITE_PLAYER))
  result.push(new Piece(6,i,'pawn',DARK_PLAYER))
 }
 return result;
}

function addPieces(result,row,player) {
  result.push(new Piece(row, 0, 'rook', player));
  result.push(new Piece(row, 1, 'knight', player));
  result.push(new Piece(row, 2, 'bishop', player));
  result.push(new Piece(row, 3, 'queen', player));
  result.push(new Piece(row, 4, 'king', player));
  result.push(new Piece(row, 5, 'bishop', player));
  result.push(new Piece(row, 6, 'knight', player));
  result.push(new Piece(row, 7, 'rook', player));
}

function chessBoard () {
const table1 = document.createElement('table');
document.body.appendChild(table1);
table1.id = "tb" ;
for(let i=0 ; i < 8 ; i++ ){
    const row = table1.insertRow(i);
    for(let j=0 ; j < 8 ; j++ ){
        const cell = row.insertCell(j);
        cell.id = "cell-" + i.toString() + j.toString();
       
        cell.addEventListener('click',onCellClick);

        if( (j +i) %2 ===0){
          cell.className = "blackcub" ;    
       }
       else{

          cell.className = "whitecub" ;
           } 
    }
   

  }
  pieces= getInitialBoard();
  for(let piece of pieces){
    addImage(table1.rows[piece.row].cells[piece.col],piece.player,piece.type );
      console.log(piece);
  }
  
  
}
  
window.addEventListener('load',chessBoard);
 


//const image = document.createElement('img');
//document.getElementById('tb').rows[5].cells[7].innerHTML= "< img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png'>" ;
//cell.appendChild(image);

