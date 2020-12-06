let root={
    data:"d10",
    children:[{
        data:"d20",
        children:[{
            data:"d50",
            children:[]
        },{
            data:"d60",
            children:[]
        }]
    },{
        data:"d30",
        children:[]
    },{
        data:"d40",
        children:[{
            data:"d80",
            children:[]
        }]
    }]
}

function displayGTree(node){
    //self work
    let mnMyfam=node.data + "=>";
    //console.log(mnMyfam);
    for(let i=0;i<node.children.length;i++){
        let child=node.children[i];
        mnMyfam+=child.data+",";
    }
    console.log(mnMyfam);
    //faith
    for(let i=0;i<node.children.length;i++){
        let child=node.children[i];
        displayGTree(child);
    }
}

displayGTree(root);