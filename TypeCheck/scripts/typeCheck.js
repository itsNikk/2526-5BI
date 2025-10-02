// variabili, costanti, tipi

// login console
console.log("Hello");

//vari
let x = 7;
let y = "ciao"

console.log("x: " + typeof x)
console.log("y: " + typeof y)

y = 4.19
console.log("y: " + typeof y)

let f;
let g = null;

let arr = [1, 2, 3, "ciao", false, true, []]
console.log("Arr: " + typeof arr)

console.log(typeof true);
console.log(typeof undefined);
console.log(typeof (4 + 5));
console.log(typeof (4 + "5"));
console.log(typeof 1 / -5)
console.log(typeof (1 / -5))
let l = 1 / 0;
console.log("1/0: " + typeof l)
console.log("NaN: " + typeof NaN);

// ma perchè è true -> numero e non l'uno -> boolean?
console.log(true + 1);
console.log(1 + "true");
console.log(false + 1);

console.log(typeof (true + 1));

console.log(5 * "44fff");

console.log(1 + 2 + '3' + 4);

let m;
console.log("m*m: " + m * m);

//Strings
let str = "nbuganza@salesianisesto.it"

console.log(str);

console.log(str[2]);
console.log(str.charAt(3));
console.log(str.indexOf('X'));
console.log(str.replaceAll("n", "X"));
console.log(str.includes("@"));
console.log("str.slice:" + str.slice(1, 8));
console.log("str.substring:" + str.substring(1, 8));

//Concatenare le stringhe
let a = "ciao"
let b = " a tutti"

//tecnica 1 - col +
console.log(a + b);

//tecnica 2 - da suare solo in NODE.js - TEMPLATE STRING
// ALT+96
console.log(`${a}${b}`);

//Confronti
if (5 != "5") {
    console.log("THEN");

} else {
    console.log("ELSE");

}

//ciclo
while(true){

}

for(let i=0;i<4;i++){
    
}