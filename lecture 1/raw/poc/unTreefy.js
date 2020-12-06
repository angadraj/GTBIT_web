let fs=require("fs");
let path=require("path");
let uniqid=require("uniqid");

//how to check if it is a file or directory?
function checkWhetherFile(path_string){
    return fs.lstatSync(path_string).isFile();
}
//content read directory ??=>google
function childReader(src){
    let children=fs.readdirSync(src);
    return children;
}

function unTreefy(src,dest,obj){
    let isFile=checkWhetherFile(src);
    if(isFile==true){
        let newName=uniqid();
        let oldName=path.basename(src);
        fs.copyFileSync(src,path.join(dest,newName));
        obj.newName=newName;
        obj.oldName=oldName;
        obj.isFile=true;
    }
    else{
        let dirName=path.basename(src);
        //let obj={};
        obj.isFile=false;
        obj.name=dirName;
        obj.children=[];
        //isFile,children,d10
        let children=childReader(src);
        for(let i=0;i<children.length;i++){
            let childpath=path.join(src,children[i]);
            let chobj={};
            unTreefy(childpath,dest,chobj);
            obj.children.push(chobj);
        }
        //children loop
    }

}
let input=process.argv.slice(2);
let root={};
let src=input[0];
let dest=input[1];
unTreefy(src,dest,root);
fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root));
console.log("data copied");