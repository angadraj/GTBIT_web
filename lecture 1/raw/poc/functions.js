// let a= 10;
// b=a;
// console.log(b);


//  function hello(greeter)
// {
//     console.log("hello "+ greeter);
//     //return undefined;
// }

// let a=hello("angad");
// console.log(a);

// function square(a)
// {
//     return a*a;
// }

// let b=square(2);
// //console.log(b);
// console.log("new square:");
// console.log(square(2));

let greeter=function sayHi(){
    console.log("function expression");
}
// console.log(greeter);
// console.log(greeter());
function myfn(a){
    console.log(a());//will this execute 
    console.log("i am waiting for line 31");
}

myfn(function sayHi(){
    let x=5;
    x++;
    console.log(x);
    console.log("function expression:");
});