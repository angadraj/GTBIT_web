let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let seriesId=process.argv[2];
let scorecardId=process.argv[3];
// seriesId=19322, scorecardId=1187684
//https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-2020`
let url=`https://www.espncricinfo.com/series/${seriesId}/scorecard/${scorecardId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-2020`
;

request(url,function(err,response,data){
    console.log("data recieved");
    if(err=== null && response.statusCode === 200){
        fs.writeFileSync("series.html",data);
        parseHTML(data);
        console.log("processing data");
    } else if(response.statusCode===404){
        console.log("page not found");
    } else{
        console.log(err);
        console.log(response.statusCode);
    }
})

function parseHTML(data){
    let $=cheerio.load(data);
    //let bowlers=$(".table.bowler");
    let bowlersArr=$(".table.bowler tbody tr");
    //fs.writeFileSync("bowlers.html",bowlers);
     let maxWicketTaker="";
     let maxWickets=0;

     for(let i=0;i<bowlersArr.length;i++) {
          let name=$($(bowlersArr[i]).find("td")[0]).text();
         //wrap up into cheerio after putting index on array
          let wickets=$($(bowlersArr[i]).find("td")[4]).text();
         //console.log(name+" "+wickets);
         if(maxWickets < wickets){
             maxWickets=wickets;
             maxWicketTaker=name;
         }
        console.log(name+" "+wickets);
     }
    console.log("######################");
    console.log("----------------------");

    }