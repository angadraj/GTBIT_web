// console.log("i am in background");
let blockedSites=[];
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        console.log(request);
        if(request=="getlist"){
            if(blockedSites.length>0){
                return sendResponse(blockedSites); 
            }
            else{
                return sendResponse([]);
            }
        }
        blockedSites.push({site:request,time:10});
        console.log(blockedSites);
        sendResponse("hello from content");
    }
)
async function init(){
    if(blockedSites.length>0){
        //qery: for current tab if it is in mylist then counter--
        let tab=await getCurrentTab();
        console.log(tab);
        if(tab){
            let cTabURL=tab.url;
            for(let i=0;i<blockedSites.length;i++){
                let isMatching=cTabURL.includes(blockedSites[i].site);
                if(isMatching){
                    chrome.browserAction.setBadgeText({text:blockedSites[i].time+" "});
                    blockedSites[i].time--;
                    console.log("time remaining "+blockedSites[i].time);
                    if(blockedSites[i].time<=0){
                        //closed current tab
                        console.log("closed"+blockedSites[i].site);
                        await closeTab(tab.id);
                        console.log("closed "+blockedSites[i].site);
                        chrome.browserAction.setBadgeText({text:" "});
                    }
                }
            }
        }

    }
    // console.log("polling");
}
function getCurrentTab(){
    return new Promise(function(resolve,reject){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            resolve(tabs[0]);
        })
    })
}
setInterval(init,1000);
function closeTab(id){
    return new Promise(function(resolve,reject){
        chrome.tabs.remove(id,function(){
            resolve();
        });
    })
}