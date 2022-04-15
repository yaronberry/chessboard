
/* window.addEventListener('load',x)
const x = ()=>{}
*/


const table = document.createElement('table');
document.body.appendChild(table);



for(let i=0 ; i < 8 ; i++ ){

    let row = table.insertRow(i);

     for(let j=0 ; j < 8 ; j++ ){
        
        let cell = row.insertCell(j);
          
       if( j % 2 ===0 && i %2 ===0){
          cell.className = "blackcub" ;    
       }
       else{
        if( j % 2 !==0 && i %2 !==0){
            cell.className = "blackcub" ;
        }
        else{
            cell.className = "yellocub" ;
        }
       }
    
    }    
  }
