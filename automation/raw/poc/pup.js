let puppeteer=require("puppeteer");
let fs=require("fs");
let credentialsFile=process.argv[2];

(async function(){
    let data =await fs.promises.readFile(credentialsFile,"utf-8");
    let credentials=JSON.parse(data);
    login=credentials.login;
    email=credentials.email;
    pwd=credentials.pwd;


    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });

    //driver.manage().window().maximize()
    //creates an empty page
    //await browser.newPage();
    //returns array of currently open tab
    let numberOfPages=await browser.pages();
    let tab=numberOfPages[0];
    //goto page
    await tab.goto(login,{
        waitUntil:"networkidle2"
    });

    //await driver.manage().window().maximize();
    await tab.waitForSelector("#input-1");
    await tab.type("#input-1",email,{delay:100});
    await tab.waitForSelector("#input-2");
    await tab.type("#input-2",pwd,{delay:100});
    await tab.waitForSelector("button[data-analytics='LoginPassword']");
    await tab.click("button[data-analytics='LoginPassword']");
    //if a click causes navigation 
    //await tab.click(selector);
    await Promise.all([tab.waitForNavigation({
        waitUntil:"networkidle2"
    }),tab.click("button[data-analytics='LoginPassword']")]);
    await tab.waitForSelector("a[data-analytics='NavBarProfileDropDown']");
    await tab.click("a[data-analytics='NavBarProfileDropDown']");
    await tab.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']",{visible:true});
    await Promise.all([tab.waitForNavigation({waitUntil:"networkidle2"}),tab.click("a[data-analytics='NavBarProfileDropDownAdministration']")]);
    
    //----------manage challenges page--------------

    let manageTabs=await tab.$$(".administration ul li a");
    await Promise.all([manageTabs[1].click(),tab.waitForNavigation({
        waitUntil:"networkidle2"
    })])
    await handleSinglePage(tab,browser);
    console.log("all questions processed");
    
})();

async function navgationHelper(tab,selector){
    await Promise.all([tab.waitForNavigation({
        waitUntil:"networkidle2"
    }),tab.click(selector)]);

}
//serially every page
async function handleSinglePage(tab,browser){
    await tab.waitForSelector(".backbone.block-center");
    let qonPage=await tab.$$(".backbone.block-center");
    let cPageQSolvedp=[];
    for(let i=0;i<qonPage.length;i++){
        //qonpage[i].getAttribute("href");

        let href=await tab.evaluate(function(q){
            return q.getAttribute("href");

        },qonPage[i]);

        let chref="https://www.hackerrank.com"+ href;
        let newTab=await browser.newPage();
        let cPageQwillBeSolvedp=solveOneQuestion(chref,newTab);
        cPageQSolvedp.push(cPageQwillBeSolvedp);

    }
    //1 Page all process
    await Promise.all(cPageQSolvedp);
    console.log("visited all questions of page 1");
    // if next button enabled=>nextClick
    let pList=await tab.$$(".pagination ul li");
    let nextBtn=pList[pList.length-2];
    let className=await tab.evaluate(function(elem){
        return elem.getAttribute("class");
    },nextBtn);
    if(className==="disabled"){
        return;
    }
    else{
        await Promise.all([nextBtn.click(),tab.waitForNavigation({waitUntil:"networkidle2"})]);
        handleSinglePage(tab,browser);
    }
}
//promise =>resolve when a new tab is opened
async function solveOneQuestion(chref,newTab){
    await newTab.goto(chref,{waitUntil:"networkidle0"});
    await newTab.waitForSelector("li[data-tab='moderators']");
    await navgationHelper(newTab,"li[data-tab='moderators']");
    await newTab.waitForSelector("#moderator",{visible:true});
    await newTab.type("#moderator","vojohom272");
    //
    await newTab.keyboard.press("Enter");
    await newTab.waitForSelector(".save-challenge.btn.btn-green");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();

}


