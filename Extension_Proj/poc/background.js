// console.log("background will appear here");
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        console.log(sender);
        if(request.greeting=="hello"){
            console.log("reciever from content");
            sendResponse({farewell:"goodbye"});
        }
    }
)