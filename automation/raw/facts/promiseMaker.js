let fs=require("fs");
console.log("start");
function promiseMkaer(path){
        return new Promise(function(resolve,reject){
            fs.readFile(path,function(err,data){
                if(err){
                    console.log("error");
                    reject();
                }
                else{
                    console.log(data+" ");
                    resolve();
                }
            })

        })
}
let frPromise=promiseMkaer("f1.txt");
frPromise.then(function(data){
    console.log("inside then");
    console.log(data+" ");
})
frPromise.catch(function(err){
    console.log(err);
})
console.log("move to next work");