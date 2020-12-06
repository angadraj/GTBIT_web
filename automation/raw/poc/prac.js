let fs=require("fs");
let puppeteer=require("puppeteer");
let login="https://www.makemytrip.com/";
let user="angadstyle98@gmail.com";
(async function(){
    let browser=await puppeteer.launch({
        headless:null,
        defaultViewport:null,
        args:["--start maximized","--disable-notifications"]
    });
    let numberOFpages=await browser.pages();
    let tab=numberOFpages[0];
    await tab.goto(login,{
        waituntil:"networkidle2"
    });
     await tab.waitForSelector(".makeFlex.column.flexOne.whiteText.latoBold");
     tab.click(".makeFlex.column.flexOne.whiteText.latoBold");

     await tab.waitForSelector("#username");
     await tab.type("#username",user,{delay:100});
     
     await tab.waitForSelector("btnContainer.appendBottom25 button.capText.font16");
     await tab.click("btnContainer.appendBottom25 button.capText.font16");

})();