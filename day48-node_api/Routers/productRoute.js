let express = require("express")
let productRouter = express.Router({})

let ProductDataModel = require("../DataModels/ProductDataModel"); //this gives access to all the methods defined in mongoose to access mongo db data

//===we'll accept the product object as req.body, use it to map with product.schema key value pair.
//initialize the productModel, if no validation error, then use the mongoose method to save product.

//localhost:9000/product/api/post

productRouter.post("/api/post", (req, res) => {
    console.log(req.body) //json data posted from API in body

    //initialize the productSchema

    ProductDataModel.findOne({ name: req.body.name }) //findOne() is a promise call. findOne() looks for the value of field "name"
        .then((existingProduct) => { //if there is no error
            if (existingProduct) {
                console.log("existingProduct: ", existingProduct);
                res.send(existingProduct)
            }
            else { //if product object is not present in products collection, we need to create new product

                //use schema to create new product object

                let newProduct = new ProductDataModel(req.body)

                newProduct.save() //save() is a promise call. save() will create a document in DB. 
                    .then((newProduct) => { //if there is no error. If successful, the _id is appended to the "newProduct" object.
                        console.log("newProduct: ", newProduct);
                        res.send(newProduct)
                    })
                    .catch((err1) => { //if there is error
                        console.log("error saving: ", err1);
                        res.send("error saving.")
                    })
            }
        })
        .catch((err) => { //if there is error
            console.log("error while searching product", err);
            res.send("error while searching product")
        })
})

//===code to fetch all the products from product collection and return back 

//localhost:9000/product/api/getAll

productRouter.get("/api/getAll", (req, res) => {
    ProductDataModel.find() //find() is a promise call. find() returns all the products from product collection
        .then((allProducts) => { //if there is no error
            res.send(allProducts)
        })
        .catch(() => { //if there is error
            res.send("error while fetching products")
        })
})

//============================

//localhost:9000/product/api/getByIds

productRouter.post("/api/getByIds", (req, res) => {
    ProductDataModel.find().where("_id").in(req.body) //find() is a promise call. Here, find() returns the products from product collection that match the given ids
        .then((matchedProducts) => { //if there is no error
            res.send(matchedProducts)
        })
        .catch(() => { //if there is error
            res.send("error while fetching products")
        })
})

//============================

module.exports = productRouter;
