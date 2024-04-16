// 1. How to preserve the immutability on my heroes list? Solve below problems using the same
// a. Get heroes who are not evils
// b. Print Unique family names
// c. Print Hero Names from given objects, and append sir in each of them before printing
// d. Do we have any hero in Marvel Family who is not evil

const heroes = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
]

//ANSWER 1: We can use the Iterators such as Filter(), Map(), Some() and Reduce() to read, modify, and recreate the Array or array of objects, and still preserve its immutability.

// 1a. Get heroes who are not evils

let heroesNotEvil = heroes.filter(e => e.isEvil == false); 

console.log(heroesNotEvil);

/*
[
  { name: 'Wolverine', family: 'Marvel', isEvil: false },
  { name: 'Deadpool', family: 'Marvel', isEvil: false },
  { name: 'Charles Xavier', family: 'Marvel', isEvil: false },
  { name: 'Batman', family: 'DC Comics', isEvil: false },
  { name: 'Legolas', family: 'Tolkien', isEvil: false },
  { name: 'Gandalf', family: 'Tolkien', isEvil: false }
]
*/

// 1b. Print Unique family names

let uniqueFamilyNames = heroes.reduce((prevElement, curElement, index, array) => { 
    prevElement.add(curElement.family);
    return prevElement;
}, new Set()); 

console.log(uniqueFamilyNames); 

/*
Set(3) { 'Marvel', 'DC Comics', 'Tolkien' }
*/

// 1c. Print Hero Names from given objects, and append sir in each of them before printing

let heroNames = heroes.map(e => {
    return e.name + " sir";
});

console.log(heroNames);

/*
[
  'Wolverine sir',
  'Deadpool sir',
  'Magneto sir',
  'Charles Xavier sir',
  'Batman sir',
  'Harley Quinn sir',
  'Legolas sir',
  'Gandalf sir',
  'Saruman sir'
]
*/

// 1d. Do we have any hero in Marvel Family who is not evil

let hasNoEvilInMarvelFamily = heroes.some(e => e.family == "Marvel" && e.isEvil == false);

console.log(hasNoEvilInMarvelFamily); 

/*
true
*/

//========================================================


//2. Use the spread and rest operator to create a function which can multiply numbers from 1...n (n is the number of choice)

function multiply(...numbers) {
    let product;
    product = numbers.reduce((prevVal, currVal) => prevVal * currVal, 1); //1 here is initial value for prevVal; if we want, we can set it to a different number.
    return product;
}

let numList = [1, 2, 3, 4];

console.log(multiply(...numList)); 

/*
24
*/

//========================================================

//3. Print the last name through destructuring and add a contact number:9119119110 as well

const person = {
    userDetails :{
        first: "FirstName",
        last: "LastName"
    }
}

let {userDetails: {last, contact = "9119119110"}} = person; 

console.log(`${last} ${contact}`);

/*
LastName 9119119110
*/

//========================================================

//4. Give me an example of const data manipulation

const User = {
    first: 1,
    last: 9
};

User.first = 5; 

console.log(User); 

/*
{ first: 5, last: 9 }
*/

//========================================================

//5. What is the difference between for-of and for-in show with examples

//for-in iterates using the Key, while for-of iterates using the Value

let arr = [3, 5, 7]; 
arr[5] = "a"; 
arr.newKey = "b"; 

for (const key in arr) {
    const value = arr[key];
    console.log(`${key}  ${value}`);
}

/*
0  3
1  5
2  7
5  a
newKey  b
*/

for (const value of arr) {
    console.log(value);
}

/*
3
5
7
undefined
undefined
a
*/

//========================================================

//6. Give me an example of bind and write its usage, comparison with arrow function

let myUser = 
{
    Name : "John",
    Address : "in somewhere",

    GetUserInfo : function() 
    {
        setTimeout((function (){ 
            console.log(`setTimeout(): ${this.Name} and ${this.Address}`); //"this" here refers to the myUser object, NOT the Timeout object, thanks to bind().
        }).bind(myUser), 1000);
    }
}

myUser.GetUserInfo();

/*
setTimeout(): John and in somewhere
*/

//Alternately, Arrow function copies the context of parent as its own context, so you don't need to use .bind():

myUser = 
{
    Name : "John",
    Address : "in somewhere",

    GetUserInfo : function() 
    {
        setTimeout(() => { 
            console.log(`setTimeout(): ${this.Name} and ${this.Address}`); //"this" here refers to the myUser object, NOT the Timeout object, thanks to Arrow Function.
        }, 1000);
    }
}

myUser.GetUserInfo();

/*
setTimeout(): John and in somewhere
*/

//========================================================

//7. Create an example showing usage of event loop in concurrent execution cycle

console.log("Concurrent Execution starts");  

setTimeout(function()
{
    console.log("Delayed Execution's Timeout"); 
}, 1000); 

console.log("Concurrent Execution ends"); 

/*
Concurrent Execution starts
Concurrent Execution ends
Delayed Execution's Timeout
*/

//========================================================

//8. create an example showing usage of short hand and default param.

let cat = "Miaow", 
dog = "Woof",
lion = "roar";

let AnimalSoundES6 = {
    cat,
    dog,
    lion
};

console.log(AnimalSoundES6); 

/*
{ cat: 'Miaow', dog: 'Woof', lion: 'roar' }
*/

function Sum(a, b = 0){
    return a + b;
}

console.log(Sum(9)); 

/*
9
*/


//========================================================

//9. Create two objects with some properties and merge them using Object method and ES6 way

let objectA = {name: "John", age: 25};
let objectB = {home: "Somewhere", office: "Virtual"};

let mergeES6 = {...objectA, ...objectB}; 
Object.assign(objectA, objectB); 

console.log(mergeES6);
console.log(objectA);

/*
{ name: 'John', age: 25, home: 'Somewhere', office: 'Virtual' }
{ name: 'John', age: 25, home: 'Somewhere', office: 'Virtual' }
*/

//========================================================

//10. Give me an example of call and apply each with it's usage

let aUser = { name:"John", age : 21};

function PrintDetails(comment) 
{
    console.log(comment, this.name, this.age);
}

PrintDetails.call(aUser, "Hello"); 
PrintDetails.apply(aUser, ["Hello"]); 

/*
Hello John 21
Hello John 21
*/
