class Game{
    constructor(firstPlayer){
        this.boardData = new BoardData();
        this.currentPlayer = firstPlayer;
        this.winner = undefined ;
    }

    tryMove(piece, row, col ) {
    const possibleMoves =  this.allowWhichTurnIsIt(piece);
    for(const possibleMove of possibleMoves){

        let helper = 1 ;
        if(possibleMove[0] === row && possibleMove[1] === col + helper && piece.type === PAWN){
            const removePiece = this.boardData.removePiece(row,col + helper);
        }


      if(possibleMove[0] === row && possibleMove[1] === col){
        const removePiece = this.boardData.removePiece(row,col);
        piece.row = row ;
        piece.col = col ;
        if(removePiece !== undefined && removePiece.type === KING){
            this.winner = piece.player ;
        }
        this.currentPlayer = piece.getOpponent();
        
        return true ;
      }
    }
    return false ;
  }
  


  allowWhichTurnIsIt(piece){
   if(this.currentPlayer !== piece.player || this.winner !== undefined){
     return [] ; 
   }
    return piece.getPossibleMoves(this.boardData);
  }


}
