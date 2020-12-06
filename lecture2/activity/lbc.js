let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let seriesId=process.argv[2];
let commentaryId=process.argv[3];
let url=`https://www.espncricinfo.com/series/${seriesId}/commentary/${commentaryId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`
console.log("sending request");

request(url,function(err,response,data){
    console.log("data recieved");
    if(err=== null && response.statusCode === 200){
        fs.writeFileSync("index.html",data);
        parseHTML(data);
        console.log("processing data");
    } else if(response.statusCode===404){
        console.log("page not found");
    } else{
        console.log(err);
        console.log(response.statusCode);
    }
})
//console.log("Doing other stuff");
function parseHTML(data){
   //page cheerio
    let $=cheerio.load(data);
    //page selector pass=>text=>text
    console.log('###################');
    //give concatenated result of the text  matching that selector
    //let text=$(".match-comment-long-text").text();
    //$();
    let AllCArr=$(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");

    // alternative =>first
    //let text =AllCArr.html();
    let text=$(AllCArr[0]).text();
    // this will bring the text inside the object
    console.log(text);
    console.log("##################");
    //console.log("text");

}
//https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20
//https://www.espncricinfo.com/series/19322/commentary/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20


