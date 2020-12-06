var cap={
    name:"steve",
    lastName:"rogers",
    age:45,
    friends:["peter","tony"],
    isAvenger:true 
}

console.log(cap);
cap.address={state:"new york",country:"usa"};
console.log(cap);
//delete cap.address;
//console.log(cap);
delete cap.age;
console.log(cap);