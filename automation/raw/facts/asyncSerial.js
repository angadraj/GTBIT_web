let fs=require("fs");
let files=["f1.txt","f2.txt","f3.txt","f4.txt","f5.txt"];
let fileReadPromise=fs.promises.readFile(files[0]);
for(let i=1;i<files.length;i++){
    //with loop we created chain ,loop is serial
    fileReadPromise=fileReadPromise.then(function(data){
        console.log(data+" ");
        return fs.promises.readFile(files[i]);
    })
}