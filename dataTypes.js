// 6 Data Types in JavaScript

// Primitive Types: assigned as value
// String, Number, Boolean, Undefined (default type in JavaScript), Null

// Non-primitive Types: assigned as reference
// Object

//===========================================

// NOTE: In ES6 (a class-based implementation, upgraded version of JavaScript), a new data type is introduced, which is the Symbol.

//===========================================

// var: is a keyword used in core-js to declare variables, functions, etc.

//console.log(data_name1); //"not defined". ReferenceError: data_name1 is not defined 

console.log(data_name); //"undefined" value - hoisting. 
var data_name = "Learning MernStack"; //declare and assign value to the variable
console.log(data_name); //Learning MernStack
console.log("data type: ", typeof data_name); //string

var data_name = "Learning Vanilla JavaScript"; //re-declare and re-assign value to the variable
var data_name = 2024; //dynamically changes the data type depending on the value assigned
console.log(data_name); //2024
console.log("data type: ", typeof data_name); //number

data_name = "hello";
console.log(data_name); //hello
console.log("data type: ", typeof data_name); //string

//undefined is when you forget to assign a value. Variable without a value, has the value "undefined". Variable has the value "undefined" is of type "undefined".
//null is when you intend to assign a null value. Variable has the value "null" is of type "object".

data_name = undefined; //Value is undefined, type is undefined 
console.log(data_name); //undefined
console.log("data type: ", typeof data_name); //undefined

data_name = null; //Value is null, type is object 
console.log(data_name); //null
console.log("data type: ", typeof data_name); //object

data_name = {}; //object (also called json object or object literal)
data_name = {
    FirstName: "a",
    Address: "b"
};
console.log(data_name); //{ FirstName: 'a', Address: 'b' }
console.log("data type: ", typeof data_name); //object

data_name = true; //default is false
data_name = 1 == 2; //same as above
console.log(data_name); false
console.log("data type: ", typeof data_name); //boolean

var emptyObj = {}; //the address may be 111
var emptyObj2 = {}; //the address may be 222
data_name = emptyObj == emptyObj2; //compare the addresses of the 2 objects, so it will be false
console.log(emptyObj); //{}
console.log(emptyObj2); //{}
console.log(data_name); //false
console.log("data type: ", typeof emptyObj); //object
console.log("data type: ", typeof emptyObj2); //object
console.log("data type: ", typeof data_name); //boolean

var emptyObj = null;
var emptyObj2 = null;
data_name = emptyObj == emptyObj2; 
console.log(emptyObj); //null
console.log(emptyObj2); //null
console.log(data_name); //true
console.log("data type: ", typeof emptyObj); //object
console.log("data type: ", typeof emptyObj2); //object
console.log("data type: ", typeof data_name); //boolean

//ES6: Symbol is used to create customized variable of your choice

var symbol_1 = Symbol("New value of my choice")
console.log(symbol_1); //Symbol(New value of my choice)
console.log("data type: ", typeof symbol_1); //symbol
