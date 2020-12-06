let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let url="https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20"
;
console.log("work started");
request(url,function(err,response,data){
    console.log("come back later");
    if(err=== null && response.statusCode === 200){
        fs.writeFileSync("index.html",data);
        parseHTML(data);
    } else if(response.statusCode===404){
        console.log("page not found");
    } else{
        console.log(err);
        console.log(response.statusCode);
    }
})
console.log("Doing other stuff");
function parseHTML(data){
    let $=cheerio.load(data);
    let text=$("title").text();
    console.log(text);
}