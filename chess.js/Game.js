class Game{
    constructor(firstPlayer){
        this.boardData = new BoardData();
        this.currentPlayer = firstPlayer;
    }

    tryMove(piece, row, col) {
    const possibleMoves =  this.allowWhichTurnIsIt(piece);

    //const possibleMoves = piece.getPossibleMoves(this.boardData);
    for(const possibleMove of possibleMoves){
      if(possibleMove[0] === row && possibleMove[1] === col){
        this.boardData.removePiece(row,col);
        piece.row = row ;
        piece.col = col ;
        this.currentPlayer = piece.getOpponent();
        return true ;
      }
    }
    return false ;
  }
  


  allowWhichTurnIsIt(piece){
   if(this.currentPlayer !== piece.player){
     return [] ; 
   }
    return piece.getPossibleMoves(this.boardData);
  }
}