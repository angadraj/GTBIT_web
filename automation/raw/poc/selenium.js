//https://www.selenium.dev/documentation/en/webdriver/browser_manipulation/
//https://www.hackerrank.com/auth/login
// 


require("chromedriver");
let swd=require("selenium-webdriver");
//build builder
let fs=require("fs");
let bldr=new swd.Builder();
let credentialsFile=process.argv[2];
//single tab
let login,pwd,email,h3Array,highArr,gCode,gtBox,gTextArea;
let driver=bldr.forBrowser("chrome").build();
let fileWillBeReadpromise=fs.promises.readFile(credentialsFile,"utf-8");
//{
    // "email":;
    // "pwd":
    // "login":
//}
fileWillBeReadpromise
    .then(function(data){
        let credentials=JSON.parse(data);
        login=credentials.login;
        email=credentials.email;
        pwd=credentials.pwd;
        let loginPWillBeOpenedP=driver.get(login);
        return loginPWillBeOpenedP;
})
.then(function(){
  let bWillBeMaximizedPromise=driver.manage().window().maximize();
    return bWillBeMaximizedPromise;
    // the screen is not comming in the size of view therefore we have to increase the size.
})
.then(function(){
    let waitForEveryonePromise=driver.manage().setTimeouts({
        implicit:10000,
        pageLoad:10000
    })
    return waitForEveryonePromise;

})
.then(function(){
    let emailBoxWillBeSelectedPromise=driver.findElement(swd.By.css("#input-1"));
    return emailBoxWillBeSelectedPromise;
})
.then(function(emailBox){
    let emailWillBeEnteredpromise=emailBox.sendKeys(email);
    return  emailWillBeEnteredpromise;
})
.then(function(){
    let pBoxWillBeFoundp=driver.findElement(swd.By.css("#input-2"));
    return pBoxWillBeFoundp;
})
.then(function(pBox){
    let pWillBeSendp=pBox.sendKeys(pwd);
    return pWillBeSendp;
})
.then(function(){
   let formP=navigatorfn("button[data-analytics='LoginPassword']")
return formP;
})
.then(function(){
    let ipBtnWillClickedPromise=navigatorfn("#base-card-1-link");
    return ipBtnWillClickedPromise;      
})
.then(function(){
    let wpBtnWillBeClickedPromise=navigatorfn("a[data-attr1='warmup']");
    return wpBtnWillBeClickedPromise;
})
.then(function(){
    let qpUrlP=driver.getCurrentUrl();
    return qpUrlP;
})
.then(function(qpurl){
    let qWillBeSolvedPromise=questionSolver(qpurl);
    return qWillBeSolvedPromise;
})
.catch(function(err){
    console.log(err);
})


function navigatorfn(selector){
    return new Promise(function(resolve,reject){
            let waitForSelector=driver.findElement(swd.By.css(selector));
            waitForSelector
                .then(function(element){
                    let elementWillBeClickedPromise=element.click();
                    return elementWillBeClickedPromise;
                }).then(function(){
                    resolve();
                }).catch(function(err){
                    reject(err);
                })

    })
}

function questionSolver(qpurl){
    return new Promise(function(resolve,reject){
        let goToQpUrlP=driver.get(qpurl);
        goToQpUrlP.then(function(){
            let goToQuestionP=navigatorfn("a[data-attr1='sock-merchant']");
            return goToQuestionP;
        })
        .then(function(){
            let goToEditorial=navigatorfn("a[data-attr2='Editorial']");
            return goToEditorial;            
        })
        .then(function(){
            let clickOnLockP=navigatorfn(".ui-btn.ui-btn-normal.ui-btn-primary");
            return clickOnLockP;
        })
        .catch(function(err){
            if(err.message==="can not read property 'click' of null"){
                console.log("Lock btn did not occur");
            }
        })
        .then(function(){
            let cAreaWillBeSelectedP=driver.findElement(swd.By.css(".challenge-editorial-block.editorial-setter-code .editorial-code-box .hackdown-content"));
            return cAreaWillBeSelectedP;      
        })
        .then(function(cArea){
            let AllH3Promise=cArea.findElements(swd.By.css("h3"));  
            let highP=cArea.findElements(swd.By.css(".highlight"));
            //all array promise=>promise=>all promises of array get resolved
            let combinedP=Promise.all([AllH3Promise,highP]);
            return combinedP;
        })
        .then(function(elementsArr){
            h3Array=elementsArr[0];
            highArr=elementsArr[1];

            let h3tPArr=[];
            for(let i=0;i<h3Array.length;i++){
                let tPromise=h3Array[i].getText();
                h3tPArr.push(tPromise);
            }

            //get text from every h3 and then get the index of the c++ code
            //get code from highArr
            return Promise.all(h3tPArr);

        }).then(function(h3TextArr){
            //console.log(h3Text);
            let codeP;
            for(let i=0;i<h3TextArr.length;i++){
                if(h3TextArr[i].includes("C++")){
                    codeP=highArr[i].getText();
                }
            }
            return codeP;
        })
        .then(function(code){
            gCode=code;
            let goToProblemPageP=navigatorfn("a[data-attr2='Problem']");
            return goToProblemPageP;
        })
        .then(function(){
            let inputBoxClickedP=navigatorfn(".custom-input-checkbox");
            return inputBoxClickedP;
        })
        .then(function(){
            let textAreaP=driver.findElement(swd.By.css(".custominput"));
            return textAreaP;
        })
        .then(function(textArea){
            gTextArea = textArea;
            let codeWillBeSubmitedP=textArea.sendKeys(gCode);
            return codeWillBeSubmitedP;
        })
        .then(function(){
            let sendCTRLaP=gTextArea.sendKeys(swd.Key.CONTROL + "a");
            return sendCTRLaP;
        })
        .then(function(){
            let sendCTRLcP=gTextArea.sendKeys(swd.Key.CONTROL + "x");
            return sendCTRLcP;
        })
        .then(function(){
            let tBoxWillBeSelectedP=driver.findElement(swd.By.css(".inputarea"));
            return tBoxWillBeSelectedP;
        })
        .then(function(tBox){
            gtBox=tBox;
            let sendCTRLaP=gtBox.sendKeys(swd.Key.CONTROL+ "a");
            return sendCTRLaP;
        })
        .then(function(){
            let sendCTRLvP=gtBox.sendKeys(swd.Key.CONTROL+ "v");
            return sendCTRLvP;
        })
        .then(function(){
            let submitCodeP=navigatorfn(".hr-monaco-submit");
            return submitCodeP;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            console.log(err.message);
            reject();
        })  
    })
}