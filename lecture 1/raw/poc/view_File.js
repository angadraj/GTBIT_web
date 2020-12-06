let fs=require("fs");
let path=require("path");

//how to check if it is a file or directory?
function checkWhetherFile(path_string){
    return fs.lstatSync(path_string).isFile();
}
//content read directory ??=>google
function childReader(src){
    let children=fs.readdirSync(src);
    return children;
}
//logic
function viewFlatFile(src){
    let isFile=checkWhetherFile(src);
    if(isFile==true){
        console.log(path.basename(src)+"*");
    }
    else{
        console.log(path.basename(src));

        let children=childReader(src);
        //console.log(children);
        for(let i=0;i<children.length;i++){ 
            let childPath=path.join(src,children[i]);//joined the path of child with parent
            //let childPath=src+"/"+children[i];
            viewFlatFile(childPath);
        }
        //children loop

    }
}
//-----------------------------------------
function viewTree(src,indent){
    let isFile=checkWhetherFile(src);
    if(isFile==true){
        //console.log(path.basename(src)+"*");
        console.log(indent+path.basename(src)+"*");
    }
    else{
        console.log(indent+path.basename(src));

        let children=childReader(src);
        //console.log(children);
        for(let i=0;i<children.length;i++){ 
            let childPath=path.join(src,children[i]);//joined the path of child with parent
            //let childPath=src+"/"+children[i];
            viewTree(childPath,indent+"\t");
        }
        //children loop

    }
}



let input=process.argv[2];
//console.log(input);
viewTree(input,"");//node tpp view src;
viewFlatFile(input);