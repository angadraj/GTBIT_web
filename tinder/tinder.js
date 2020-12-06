let puppeteer=require("puppeteer");
let login="https://tinder.com/";
const{username,pwd}=require("./credentials"); 
(async function(){
    let browser=await puppeteer.launch({
      headless:false,
      defaultViewport:null,
       args:["--start Maximized","--disable-notifications"]})

    let numberOFpages=await browser.pages();
    let page=numberOFpages[0];
    await page.goto(login,{
        waituntil:"networkidle2"
    });

    await page._client.send("Emulation.clearDeviceMetricsOverride");
    await page.waitForXPath('(//*[@id="modal-manager"]/div/div/div/div/div[3]/span/button)');
    const [moreOptBtn]=await page.$x('(//*[@id="modal-manager"]/div/div/div/div/div[3]/span/button)');
    moreOptBtn.click();
    // page.setDefaultNavigationTimeout(600);
    await page.waitForXPath('(//*[@id="modal-manager"]/div/div/div/div/div[3]/span/div[2]/button)');
    const [fbLoginBtn]=await page.$x('(//*[@id="modal-manager"]/div/div/div/div/div[3]/span/div[2]/button)');
    fbLoginBtn.click();

    // const newPagePromise=new Promise(x=>
    //     browser.once("targetcreated",target=>x(target.page()))
    //     );
    // const fbPopUp=await newPagePromise;  
    // await fbPopUp.waitForSelector("#email");
    // await fbPopUp.click("#email");
    // await fbPopUp.keyboard.type(username);
    // await fbPopUp.waitForSelector("#pass");
    // await fbPopUp.click("#pass");
    // await fbPopUp.type(pwd);  

    
})();