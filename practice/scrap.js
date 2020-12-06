let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
//let seriesId=process.argv[2];
//let scoreCardId=process.argv[3];
//19322 ,1187684
//let url=`https://www.espncricinfo.com/series/${seriesId}/scorecard/${scoreCardId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`;
let url="https://www.espncricinfo.com/series/19322/commentary/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
// created request
request(url,function(err,response,data){
    if(err===null && response.statusCode===200){
        fs.writeFileSync("bowler1.html",data);
        parseHTML(data);
        console.log("processing done");
    }
    else if(response.statusCode===404){
        console.log("page not found");
    }
    else{
        console.log(err);
        console.log(response.statusCode);
    }
})

// say data is arrived
function parseHTML(data){
    let $=cheerio.load(data);
    let arr=$("div.match-comment-long-text span p");
    let ans=$(arr[10]).text();
    console.log(ans);
    // console.log("bye");
     //console.log(arr);

}
