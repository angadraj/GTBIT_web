let arr=[4,14,17,18,23,48 ];
function transformer(a)
{
    if(a%2==0)
    {
        return a+=1;
    }
    else{
        return a-=1;
    }
}

//filter
// we have to filter out those elements which will satisfy our needs;
function test(a){
    for(let div=2;div*div<=a;div++)
    {
        if(a%div==0)
        {
            return false;
        }
    }
    return true;
}

let ans1=arr.map(transformer);
let ans2=ans1.filter(test);

console.log(arr);
console.log("-------------------");
console.log(ans1);
console.log("-------------------");
console.log(ans2);

