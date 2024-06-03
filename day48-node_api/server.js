const express = require('express'); //import the Express class constructor. In this case, it must be named "express".
const app = express(); //invoking the class to create express app server. Call the function express() to create an Express application and set it to variable app. The express() function is a top-level function exported by the express module.

const port = 9000;

const cors = require("cors");
app.use(cors()); //enabling cross origin resource sharing at root level

//json middle-ware for setting request content type to json in body so that we can accept json format in the request body
app.use(express.json({limit:'2mb', extended:false})); 

//===================================

//setting up the middleware static to handle all the static files we need to serve to client.
//serve static files such as images, css, etc.:

//app.use('/static', express.static('public')); //To access 'public' folder, you access: localhost:3000/static/

//NOTE: In case the __dirname does not work when using router, we can do the following:
//In the .js main file that runs the server:
//global.rootDir = __dirname;
//In the router page, instead of __dirname, use global.rootDir 
//res.sendFile(global.rootDir + "/Public/index.html")

//===================================
//===================================
//===================================

/*
//The code in this section is moved to file defaultRoute.js, and we include the following code to call it:

const defaultRouter = require("./Routers/defaultRoute");
app.use("/",defaultRouter);

//Another Way: we can have one main Express app and multiple other Express apps to handle other things:

const adminApp = express(); // a new Express app to handle requests mounted with admin in path.
app.use("/admin", adminApp); //path mounting to other Express app
const adminRouter = require("./Routers/adminRoute"); //The code in this section is moved to file adminRoute.js, and we include the following code to call it:
adminApp.use(adminRouter);
*/

//api paths: 
//localhost:9000/user/api/signinup
//localhost:9000/user/api/users

const userRouter = require("./Routers/userRoute");
const userApp = express();
app.use("/user", userApp);
userApp.use(userRouter);

//===================================

//api paths: 
//localhost:9000/product/api/post
//localhost:9000/product/api/getAll

const productRouter = require("./Routers/productRoute");
const productApp = express();
app.use("/product", productApp);
productApp.use(productRouter);

//===================================
//===================================
//===================================

app.listen(port); 

console.log("api launched at - localhost:" + port);

//To stop running: ctrl + c 
