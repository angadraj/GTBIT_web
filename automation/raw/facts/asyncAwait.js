let fs=require("fs");
console.log("started");
( async function(){
    let frp=fs.promises.readFile("f1.txt");// this is the content inside the then function
    let data =await frp;
    console.log("in side");
    console.log(data+" ");

})()

console.log("finished");