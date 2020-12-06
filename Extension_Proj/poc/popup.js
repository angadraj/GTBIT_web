// console.log("i will execute when popup will be clicked");
const btn=document.querySelector("button");
btn.addEventListener("click",function(){
    console.log("button was clicked");
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id,"message from popup");
    })
});
//we need to identify the tab with which we want to communicate