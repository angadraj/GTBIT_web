let fs=require("fs");
console.log("start");
let ans=fs.readFile("f1.txt",function(err,data){
   if(!err){
       console.log(data+" ");
       console.log("done");
   }
   else{
       console.log(err);
   }
});
console.log("moved");