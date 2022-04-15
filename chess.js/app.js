const table = document.createElement('table');
document.body.appendChild(table);



for(let i=0 ; i < 8 ; i++ ){

    let tr = document.createElement('tr');
    

     for(let j=0 ; j < 8 ; j++ ){
        
         
        tr.appendChild(document.createElement('td'));
       
    
    }
table.appendChild(tr);
  
     
}