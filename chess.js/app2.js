
tyuta page !!

let selectedCell;
cell.addEventListener('click',onCellClick);

function onCellClick(event){
    if(selectedCell !== undefined){
        selectedCell.classList.remove('selected');
    
    }
    selectedCell=event.currentTarget;
    selectedCell.classList.add('selected');
}


let pieces=[];
class Piece{
    constructor(row,col,type,player){
        this.row=row;
        this.col=col;
        this.type=type;
        this.player;
    }
}

    this is before he ask to make an object for every pieces

         if(i===6){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png');  
        }else if (i===1){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png');  
        }else if((j===2 || j===5) && i===0 ){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/60px-Chess_bdt45.svg.png'); 
        }else if((j===1 || j===6) && i===0 ){    
         addImage(cell, 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png');
        }else if((j===0 || j===7) && i===0 ){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png');
        }else if(i===0 && j===3){
            addImage(cell, 'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png');
        }else if(i===0 && j===4){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png') ;

        }else if((j===2 || j===5) && i===7 ){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png'); 
        }else if((j===1 || j===6) && i===7 ){    
         addImage(cell, 'https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png');
        }else if((j===0 || j===7) && i===7 ){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png');
        }else if(i===7 && j===3){
            addImage(cell, 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png');
        }else if(i===7 && j===4){
            addImage(cell,'https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png') ;
        }
    