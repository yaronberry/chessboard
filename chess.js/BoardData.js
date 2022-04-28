class BoardData { //here is the father off all the creation (except the board)
    constructor() {
      this.initPieces();
    }

     initPieces() { // here we create an object for every pieces
        this.pieces = [];
     //   this.addPieces(result, 0, WHITE_PLAYER);
      //  this.addPieces(result, 7, DARK_PLAYER);
      
        for (let i = 0; i < 8; i++) {
          this.pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER))
          this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER))
          this.pieces.push(new Piece(6, i, PAWN, DARK_PLAYER))
          this.pieces.push(new Piece(7, i,  PIECES[i] , DARK_PLAYER))
        }
        
      }

    getPiece(row, col) {
      for (const piece of this.pieces) {
        if (piece.row === row && piece.col === col) {
          //console.log(piece);
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
          let eatenPieces = this.listOfTheEatenPieces(piece);
          this.insertingTheListIntoEachDiv(eatenPieces,piece);
          return piece ;
        }
      }
    }
  

  listOfTheEatenPieces(piece ,row ,col){
      let result = [];
      const piece1 = this.getPiece(row, col);
      if(piece.type ===PAWN ){
         result.push(PAWN);
      }
      if(piece.type ===ROOK ){ 
        result.push(ROOK);
    }
    if(piece.type === KNIGHT ){
        result.push(KNIGHT);
    }
    if(piece.type ===BISHOP ){
        result.push(BISHOP);
    }
    if(piece.type ===KING ){
        result.push(KING);
    }
    if(piece.type ===QUEEN ){
        result.push(QUEEN);
    }
    return result;
  }



insertingTheListIntoEachDiv(eatenPieces , piece){
if(piece.player === DARK_PLAYER){
let blackPieceEatenBlock = document.getElementById('eatenPiece2');
const blackPieceEaten = document.createElement('li');
blackPieceEaten.innerHTML = eatenPieces ;
blackPieceEatenBlock.appendChild(blackPieceEaten);
}

if(piece.player === WHITE_PLAYER){
    let whitePieceEatenBlock = document.getElementById('eatenPiece3');
    const whitePieceEaten = document.createElement('li');
    whitePieceEaten.innerHTML = eatenPieces ;
    whitePieceEatenBlock.appendChild(whitePieceEaten);
    }
}

}