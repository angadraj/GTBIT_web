let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let count=0;
let leaderboard=[];
let seriesId=process.argv[2];
//let scorecardId=process.argv[3];
// seriesId=19322

let url=`https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results`;
console.log("sending request");

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
    console.log("#################");
    let AllCards=$(".match-score-block");
    for(let i=0;i<AllCards.length;i++){
        let matchType=$(AllCards[i]).find("p.small.match-description").text();
        let test=matchType.includes("ODI") || matchType.includes("T20");
        if(test==true){
            //console.log(matchType);
            //scorecard=href
            let link=$(AllCards[i]).find(".match-cta-container a").attr("href");
            //console.log(link);
            let fullLink=`https://www.espncricinfo.com${link}`;
            //console.log(fullLink);
            count++;
            matchHandler(fullLink);
        }
    }
    console.log("##################");
}

function matchHandler(link){
    request(link,function(err,response,data){
        //console.log("data recieved");
        if(err=== null && response.statusCode === 200){
            fs.writeFileSync(`match${count}.html`,data);
            count--;
            handleEachMatch(data);
            if(count==0){
               // console.log("All match processed");
               console.table(leaderboard);
            }
            //parseHTML(data);
            //console.log("processing data");
        } else if(response.statusCode===404){
            console.log("page not found");
        } else{
            console.log(err);
            console.log(response.statusCode);
        }
    })
    
}

function handleEachMatch(data){
    let $=cheerio.load(data);
    let format=$(".match-page-wrapper .desc.text-truncate").text();
    //let format=$(".match-page-wrapper .desc.tet-truncate").text();
    if(format.includes("ODI")){
        format="ODI";
    }   else{
        format="T20";
    }
    console.log(format);
    let inningsArr=$(".match-scorecard-table");
    let fti=inningsArr[0];
    let sti=inningsArr[1];

    let ftiName=$(fti).find(".header-title.label").text();
    let fInningPlayers=$(fti).find(".table.batsman tbody tr");
    ftiName=ftiName.split("Innings")[0];
    //console.log(ftiName);
    for(let i=0;i<fInningPlayers.length;i++){
        let isBatsman=$(fInningPlayers[i]).find("td").hasClass("batsman-cell");
        if(isBatsman==true){
            let pName=$($(fInningPlayers[i]).find("td")[0]).text();
            let runs=$($(fInningPlayers[i]).find("td")[2]).text();
            //console.log(pName +"  "+ runs);
            createLeaderBoard(pName,format,runs,ftiName);
        }
    }
    console.log("``````````````````");
    let stiName=$(sti).find(".header-title.label").text();
    console.log(stiName);
    stiName=stiName.split("Innings")[0];
    let sInningPlayers=$(sti).find(".table.batsman tbody tr");
    //console.log(stiName);

    for(let i=0;i<sInningPlayers.length;i++){
        let isBatsman=$(sInningPlayers[i]).find("td").hasClass("batsman-cell");
        if(isBatsman==true){
            let pName=$($(sInningPlayers[i]).find("td")[0]).text();
            let runs=$($(sInningPlayers[i]).find("td")[2]).text();
            //console.log(pName +""+ runs);
            createLeaderBoard(pName,format,runs,stiName);
        }
    }
    //console.log("22222222222222222222");

}

function createLeaderBoard(name,format,runs,team){
    runs=parseInt(runs);
    for(let i=0;i<leaderboard.length;i++){
        let player=leaderboard[i];
        if(player.Name===name && player.Team===team && player.Format===format){
            player.Total+=runs;
            return;
        }

    }
    let pObj={
        Name:name,
        Format:format,
        Total:runs,
        Team:team
    }
    leaderboard.push(pObj);
}


