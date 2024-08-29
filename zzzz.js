

try{
     setTimeout(()=>{
         console.log(a);
     },2000)
 }
 catch(err){
         console.log("Cath: Error caught", err.message);
 }

 console.log("End of code")