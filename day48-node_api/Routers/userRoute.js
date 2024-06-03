let express = require("express")
let userRouter = express.Router({})

let UserDataModel = require("../DataModels/UserDataModel"); //this gives access to all the methods defined in mongoose to access mongo db data

//===we'll accept the user object as req.body, use it to map with user.schema key value pair.
//initialize the userModel, if no validation error, then use the mongoose method to save user.

//localhost:9000/user/api/signinup

userRouter.post("/api/signinup", (req, res) => {
    console.log(req.body) //json data posted from API in body

    //initialize the userSchema

    UserDataModel.findOne({ userName: req.body.userName }) //findOne() is a promise call. findOne() looks for { userName: req.body.userName } 
        .then((existingUser) => { //if there is no error
            if (existingUser) {
                console.log("sigin in success ", existingUser);
                res.send(existingUser)
            }
            else { //if user object is not present in users collection, we need to create new user

                //use schema to create new user object

                let newUser = new UserDataModel(req.body)

                newUser.save() //save() is a promise call. save() will create a document in DB. 
                    .then((newUser) => { //if there is no error. If successful, the _id is appended to the "newUser" object.
                        console.log("successful signup ", newUser);
                        res.send(newUser)
                    })
                    .catch((err1) => { //if there is error
                        console.log("err signup", err1);
                        res.send("error while sign up")
                    })
            }
        })
        .catch((err) => { //if there is error
            console.log("err sign in", err);
            res.send("error while searching user sign in")
        })
})

//===code to fetch all the users from user collection and return back 

//localhost:9000/user/api/users

userRouter.get("/api/users", (req, res) => {
    UserDataModel.find() //find() is a promise call. find() returns all the users from user collection
        .then((allusers) => { //if there is no error
            res.send(allusers)
        })
        .catch(() => { //if there is error
            res.send("error while fetching users")
        })
})

//==============================

//localhost:9000/user/api/insertProduct

userRouter.post("/api/insertProduct", (req, res) => 
{
    console.log("req.body", req.body) //json data posted from API in body       

    UserDataModel.findOne({$or: [{_id: req.body._id}, {userName: req.body.userName}]}) //findOne() is a promise call. findOne() looks for either _id or userName. 
        .then((foundDocument) => { //if there is no error
            if (foundDocument) {
                console.log("foundDocument ", foundDocument);

                /*
                UserDataModel.updateOne(
                    { userName: req.body.userName }, 
                    { $set: { mobile: 241 } }
                ).then((updateInfo) => { //.then() is required for it to execute
                */
                //or
                /*
                UserDataModel.updateOne(
                    { _id: "66593e97bca097824b191113" }, 
                    { $set: { mobile: 244511 } }
                ).then((updateInfo) => { //.then() is required for it to execute
                */
                //or   
                /*                           
                UserDataModel.updateOne( //updateOne does not return the updated Document
                    { _id: existingUser._id },
                    { $set: { products: req.body.products } }, //if this field exists, it will be updated, if not exist, it will be added (need to set strict: false)
                    { strict: false } //Set it to false because the strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db.
                ).then((updateInfo) => { //.then() is required for it to execute
                */
                //or
                UserDataModel.findOneAndUpdate( //findOneAndUpdate will return the updated Document (remember to set new: true)
                    { _id: foundDocument._id },
                    { $set: { products: req.body.products } }, //if this field exists, it will be updated, if not exist, it will be added (need to set strict: false)
                    { strict: false, //Set it to false because the strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db.
                        new: true } //if true, return the modified document rather than the original 
                ).then((updatedDocument) => { //.then() is required for it to execute
                    console.log("executed succesfully: ", updatedDocument);
                    //res.send("something"); //send back response data
                    res.send(updatedDocument); //send back response data                    
                }).catch((err) => {
                    console.error("Error updating: ", err);
                });
               
            }
            else { //if no Document is found, we need to create new Document for it:
                
                //use schema to create new user object
                
                let newUser = new UserDataModel(req.body); //if the req.body has more fields than the UserDataModel schema, those extra fields will not be created in the DB. 

                newUser.save() //save() is a promise call. save() will create a document in DB. 
                    .then((newUser) => { //if there is no error. If successful, the _id is appended to the "newUser" object.
                        console.log("successful signup ", newUser);
                        res.send(newUser); //send back response data
                    })
                    .catch((err1) => { //if there is error
                        console.log("err signup", err1);
                        res.send("error while sign up"); //send back response data
                    })
                
            }
        })
        .catch((err) => { //if there is error
            console.log(err);
            res.send("error while searching"); //send back response data
        })
})

//==============================

module.exports = userRouter;

