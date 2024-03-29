//March - MERNStack Session - Assessment Number 1
//Q1. Create a file with name basics and show all the features that you know about javascript

//Ans: JavaScript is a client-side scripting language. It is a Interpreted languague. It is object oriented JavaScript (OOJS). It is functional, dynamic typing, case sensitive, and auto casting. It is Compiled as well as Interpreted Mixed. UnTyped - a variable can be assigned any value. Dynamic Typing - The value type of a variable can change during the execution of a program and JavaScript takes care of it automatically. Semicolons are Optional - Each line of instruction is called a statement. Semicolons are optional in JavaScript. Hoisting - behaves as the snapshot or lookahead of the JavaScript code present, and gives behavior of partial compilation. Closure - when we have a function within a function, and parent function returns child function, we can limit what can be accessed by external user through child function. 

//Q2. As javascript is not a type safe and has auto cast feature - try showing below values from the same variable
// and its type as well :values are - "Robert ", .0266, false, {myname : "Test Me"}, 25166665, undefined, true, "Robert Jr.", null, {}, -32767

//Ans:
var obj = "Robert";
console.log(obj); 
console.log(typeof obj); //string
obj = .0266;
console.log(obj); 
console.log(typeof obj); //number
obj = false;
console.log(obj); 
console.log(typeof obj); //boolean
obj = {myname : "Test Me"}; 
console.log(obj); 
console.log(typeof obj); //object
obj = 25166665;
console.log(obj); 
console.log(typeof obj); //number
obj = undefined;
console.log(obj); 
console.log(typeof obj); //undefined
obj = true;
console.log(obj); 
console.log(typeof obj); //boolean
obj = "Robert Jr.";
console.log(obj); 
console.log(typeof obj); //string
obj = null;
console.log(obj); 
console.log(typeof obj); //object
obj = {};
console.log(obj); 
console.log(typeof obj); //object
obj = -32767;
console.log(obj); 
console.log(typeof obj); //number

//Q3. Create a function with name show user info, this function expects three params, firstname, lastname and age
//  print all the details in the given function

//Ans:

function showUserInfo(firstname, lastname, age)
{
    console.log(firstname, lastname, age);
}

showUserInfo("Alex", "Smith", 20); //Alex Smith 20


//Q4. Create a function with name doaddition, pass three parameters and return the sum of all the three numbers
// below output needs to be monitored - add(2,3,4), add(2), add(2.3,3), add("first", 2, "three")
// analyse the outputs we got and try explaining the reasons behind

//Ans:

function add(a, b, c)
{
    return a + b + c;
}

console.log(add(2, 3, 4)); //9
console.log(add(2)); //NaN (b and c are undefined, so 2 + undefined + undefined = NaN)
console.log(add(2.3,3)); //NaN (c is undefined, so 2.3 + 3 + undefined = NaN)
console.log(add("first", 2, "three")); //first2three (because of string concatenation)


//Q5. Give me an example of your choice on closure, hoisting, constructor function, each.

//Ans:

//example on closure:

function fnOuter(userName, userPin)
{
    //private scope of parent function
    var name = "something";
    var pin = "12345";
    
    var feInner = function()
    {
        //public scope which is accessible to others.
        if(name==userName && pin==userPin)
        {            
            return true;
        }
        else
        {
            return false;
        }
    }

    return feInner;
}

//example on hoisting:

console.log(varName); //undefined
console.log(fnOther("alan")); //alan

var varName = "mint";

function fnOther(pName)
{
    return pName;
}

//example on constructor function:

function Area(length, width)
{
    this.length = length 
    this.width = width; 

    this.rectangle = function () {
        return this.length * this.width;
    }; 
}

//Optional Question - what will the following code output? why?

// var arr = [10, 12, 15, 21];
// for (var i = 0; i < arr.length; i++) {
//   setTimeout(function() {
//     console.log('Index: ' + i + ', element: ' + arr[i]);
//   }, 3000);
// }
