let obj={
    "name":"angad",
    "class":4,
    "school":"hips",
    get href(){
        return `/${this.name}/`;
    }
};
// obj["href"]=`/${obj["name"]}/`;
console.log(obj.href);