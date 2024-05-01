let express = require("express");
let student = express.Router({caseSensitive:true});

student.get('/data', function (req, res) 
{   
    res.json({data: 2});
})

module.exports = student;