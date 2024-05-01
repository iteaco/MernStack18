const fs = require("fs");

const express = require('express'); 
const app = express(); 

//ans 3:

const student = require("./Student.js");
app.use("/", student);

//ans 4:

//http://localhost:3000/getStudentDetails?name=John&age=20&address=somewhere&session=JS

app.get('/getStudentDetails', function (req, res) 
{   
    let queryString = req.query; 
    res.json(queryString);

    //ans 5:

    let writerStream = fs.createWriteStream("studentInfo.json", "utf8");
    writerStream.write(JSON.stringify(queryString));
    writerStream.end();
})

app.listen(3000); 

console.log("api launched at - localhost:3000");

//To stop running: ctrl + c 
