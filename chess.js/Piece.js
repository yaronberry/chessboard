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