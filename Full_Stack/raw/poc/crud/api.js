// http://localhost:3000/api/users
//npm init -y
//npm i express
//npm i nodemon --save-dev
//create start script in pack.json => "start":"nodemon crud/api.js"
// in pkg.json dir =>npm start
const express=require("express");
const app=express();
const userDB=require("./user.json");
const fs=require("fs");
const path=require("path");
const {create}=require("domain");
app.use(function(req,res,next){
    console.log("1st");
    console.log("line 17"+req.body);    
    console.log(req);
    console.log("-------------------------");
    next();
})
//predefined
app.use(express.json());
app.use(function(req,res,next){
    console.log("2nd");
    console.log("line 24");
    console.log(req.body);
    next(); 
})
//REST api
//HTTP request=>
//create POST
//read=>Get
// app.get("/api/users",function(req,res){
//     console.log("recieved req");    
//     res.status(200).json({
//         status:"Success recieved get request from client"
//     })
// })
app.post("/api/users",function(req,res){
    let user=req.body;
    // db save
    //console.log(user);
    //if a new entry is created on server
    //memory->ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    //res statue code server send
    res.status(201).json({
        sucess:"successfull",
        user:user
    })
})
//read=>GET
app.get("/api/users/:user_id", function (req, res) {
    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    if(user===undefined){
        return res.status(404).Json({
            "status":"failure",
            "message":"user not found"
        });
    }
    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "no user"
    })
})
//update => PATCH
//client will be your id in url and data to update in req body
app.patch("/api/users/:user_id", function (req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let user;
    let toUpdate=req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id){
            user = userDB[i];
        }
    }
    for(let key in user){
            user[key]=toUpdate[key];
    }
    if(user===undefined){
        return res.status(404).Json({
            "status":"failure",
            "message":"user not found"
        });
    }
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    // update 
    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "no user"
    })
})
//delete=>DELETE
app.delete("/api/users/:user_id",function(req,res){
    let {user_id}=req.params;
    //{user_id:112345}
    userDB=userDB.filter(function(user){
        return user.user_id!=user_id;
    })
})
//localhost:3000/api/users
app.listen(3000,function(){
    console.log("server is listening to port 3000");
})
