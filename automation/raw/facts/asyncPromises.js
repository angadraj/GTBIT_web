//we will read files with the help of promises
let fs=require("fs");
let fileReadPromise=fs.promises.readFile("f1.txt");
console.log("start");
console.log(fileReadPromise);
//time to resolve the promise
fileReadPromise
.then(function(data){
        //ensure file id read
        console.log("in then");
        console.log(data+" ");
})
.catch(function(err){
        console.log("in catch");
        console.log(err);
})
console.log("finished");
