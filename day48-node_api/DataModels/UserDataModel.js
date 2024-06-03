//steps:
//import mongoose, use the mongoose to create db if not there a connection.
//a schema to demonstrate the data key value pairs + validations.
//using schema create a datamodel to provide mongoose methods to access modify data and create the collection.

//This data model will allow us to do mapping with mongodb using mongoose.
//MongoDB - non-relational, document oriented DB, non-schema
//create a connection using mongodb client, 
//use mongoose to make connection to mongodb
//get schema object created and also develop data model to be used in api
//set validations and data types in schema
//although mongodb is schema less but with mongoose we can create schema to start with

let mongooseObj = require("mongoose");
mongooseObj.connect("mongodb://127.0.0.1/mernstack18"); //creates db with name mernstack18 or opens a connection if already present

schemaObj = mongooseObj.Schema; //using the schema class from mongoose

let userSchema = new schemaObj({ //schema to create the structure for the Document.
    userName : {type: String, required : true},
    password: {type:String, required : true},
    street: String,
    mobile: Number,
    products: [] //empty array
},
{
    versionKey: false //versionKey is part of mongoose. Default is true. Set to false to NOT have it created in a mongodb's Document.
    //When first created, it is __v: 0. Each time a Document is updated, its value increases, for example: __v: 1
}
)

let UserModel = mongooseObj.model("user", userSchema);//create the model. "user" is the Collection name, which is pluralised by mongodb to become "users".

module.exports = UserModel; // this can be used in router/s to access the mongoose model methods like select, update queries.
