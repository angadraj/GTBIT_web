// console.log("hi");
function replaceImage(){
    let imagePaths=[
        "Images/image-1.jpg",
        "Images/image-2.jpg",
        "Images/image-3.jpg",
        "Images/image-4.jpg",
    ];
    let aiP=document.querySelectorAll("img");
    for(let i=0;i<aiP.length;i++){
        let idx=Math.floor(Math.random()*imagePaths.length);
        let fullPath=chrome.extension.getURL(imagePaths[idx]);
        console.log(fullPath);
        // aiP[i].src=fullPath;
        aiP[i].srcset=fullPath;
    }
}
let message={greeting:"hello"};
chrome.runtime.sendMessage(message,function(response){
    console.log("recieved from background.js");
    console.log(response);
});
//simple communication btw content and background
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        console.log(sender);
        console.log(request);
        if(request.greeting=="hello"){
            console.log("recived from popup");
        }
        sendResponse("message from popup");
        replaceImage();
    }
)
//background talks with content
