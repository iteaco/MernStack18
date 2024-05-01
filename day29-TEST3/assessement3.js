//Assessment NodeAPI and ES6 - 01-May-2024

//1. Create a setup for Express Web Server

//npm init
//npm i express        
//exclude node_modules from git

//========================================

//2. Configure a route name - Student

//see Student.js

//========================================

//3. Create a express app and configure in server.js to delegate routes with - "Student"

//see server.js

//========================================

//4. Create API's in default setup - getStudentDetails - Pass Student info like - Name, Age, Address, Session as query string

//see server.js

//========================================

//5. Save this information received in #4  to a file named studentInfo using fs module async way

//see server.js

//========================================

//6. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc

let myMap = new Map();

let keyString = 'a string';

myMap.set(keyString, "String is key for this.");
console.log(myMap.entries()); //[Map Entries] { [ 'a string', 'String is key for this.' ] }
console.log(myMap.get(keyString)); //String is key for this.  
myMap.delete(2000);    
myMap.clear();

let mySet = new Set(["a", "b", "c"]);

mySet.add("d");
console.log(mySet.entries());
/*
[Set Entries] {
  [ 'a', 'a' ],
  [ 'b', 'b' ],
  [ 'c', 'c' ],
  [ 'd', 'd' ]
}
*/
console.log(mySet.has("e")); //false
mySet.delete("a");
mySet.clear();

//========================================

//7. Create a promise object that get resolved after two seconds and rejected after three. Also it returns five ES6 features on resolved

let promiseStudent = new Promise((resolve, reject) => 
{
    setTimeout(()=>{
        resolve({
            status : "resolved",
            ES6Features: "lexical scope, for...in, for...of, default function params, key value pair shorthand, destructuring, spread & rest operator, class, arrow function..."
        })}, 
    2000);

    setTimeout(()=>{
        reject({
            status : "rejected"
        })}, 
    3000);
}); 

promiseStudent.then((response, error) => 
{
    console.log("execution is successful  ", response); //resolved
}).catch((response, error) => {
    console.log("execution is failed  ", response); //rejected
})

/*
execution is successful   
{
  status: 'resolved',
  ES6Features: 'lexical scope, for...in, for...of, default function params, key value pair shorthand, destructuring, spread-rest syntax, class, arrow function...'
}
*/

//========================================

//8. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)

function multiply(...theArgs) {  
    return theArgs.reduce((previous, current) => {return previous * current;});
} 

console.log(multiply(1, 2, 3, 4)); //24
const numbers = [1, 2, 3]; 
console.log(multiply(...numbers)); //6

//========================================

//9. Use the question #7 to build promises using async and await - with multithread

function promiseStudent2()
{
    return new Promise((resolve, reject) => 
    {
        setTimeout(()=>{
            resolve({
                status : "resolved",
                ES6Features: "lexical scope, for...in, for...of, default function params, key value pair shorthand, destructuring, spread & rest operator, class, arrow function..."
            })}, 
        2000);

        setTimeout(()=>{
            reject({
                status : "rejected"
            })}, 
        3000);
    }); 
}

async function asyncCall() 
{
    await promiseStudent2()
        .then((data, err) => console.log(data))
        .catch((err) => console.log(err));
}

asyncCall(); 

/*
{
  status: 'resolved',
  ES6Features: 'lexical scope, for...in, for...of, default function params, key value pair shorthand, destructuring, spread & rest operator, class, arrow function...'
}
*/

//========================================

//10. Create an example of generator function of your choice

function* arithmetic(num1, num2) {

    yield console.log("Addition : " + (num1 + num2));
    yield console.log("Subtraction : " + (num1 - num2));
    yield console.log("Multiply : " + (num1 * num2));
    yield console.log("Division : " + (num1 / num2));

    return "Done";
}

let calObj = arithmetic(6, 2);

calObj.next(); //Addition : 8
calObj.next(); //Subtraction : 4
calObj.next(); //Multiply : 12
calObj.next(); //Division : 3
console.log(calObj.next()); //{ value: 'Done', done: true }
console.log(calObj.next()); //{ value: undefined, done: true }
