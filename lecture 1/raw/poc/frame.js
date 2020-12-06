// function frame(a,scb,fcb){
//     for(let div=2;div*div<=a;div++){
//         if(a%div==0){
//             return fcb();
//         }
//     }
//     return scb();
// }

// function fcb(){
//     console.log("not prime");
// }

// function scb(){
//     console.log("prime");
// }
// frame(100,scb,fcb);
// frame(103,scb,fcb);


// function power(base){
//     function main(exp){
//         return Math.pow(base,exp);
//     }
//     return main;
// }

// let x=power(2);
// console.log(x(10));


// x=(base) => {
//     return (exp)=>{
//         return Math.pow(base,exp);
//     }
// }
// let y=x(2);
// console.log(y(10));

//implement powercreater(powercreater(5)(3))(2);

function powercreater(x1){
     return Math.pow(x1,function(
          Math.pow(x2,x3);
     ));
}

let a=powercreater(powercreater(5)(3))(2);
x