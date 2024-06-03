/*
Actions 
•   Actions are object, contains type and payloads of information 
•   You send action to the store using store.dispatch(). 

action is an object with 2 properties: type and payload.

for example:

let action = {
    type: "INCREMENT",
    value: 10
}
*/

/*
Dispatch 
•   Dispatch is the only  way to call reducers 
•   Dispatch dispatches actions to store. Store  deliver to all reducers. 
•   Upon receiving actions, reducers should  respond with new state, if no state change,  return existing state as it is. 

//Syntax

store.dispatch({ action })

store.getState() => 0  store.dispatch({
    type: "INCREMENT",
    payload: { value: 10 }
})

store.getState() => 10  store.dispatch({
    type: "DECREMENT",
    payload: { value: 5 }
})

store.getState() => 5
*/


import * as actionTypes from "../actionTypes";

import axios from "axios"; //to make calls to the server

export const AddProductToStore = (product) => 
{
    return {
        type: actionTypes.ADD_PRODUCT_TO_STORE, //the actionType to be matched in productReducer.js
        payload: product //the payload which will update the product state
    }
}

//==============================

//server call to save product to MongoDB 

export const SaveProductToDB = (newProduct) => 
{
    return (dispatch) => {
        axios.post("http://localhost:9000/product/api/post", //uri or end point 
            newProduct // the product state object we dispatch from the product component
        )
            .then((collection) => { //if there is no error
                let loggedProduct = collection.data
                console.log(loggedProduct)
                dispatch(AddProductToStore(loggedProduct))
            })
            .catch((err) => { //if there is error
                console.log("error while SaveProductToDB: ", err)
            })
    }
}

//===another way to SaveProductToDB by using Fetch

export const SaveProductToDBUsingFetch = (newProduct) => {
    return (dispatch) => {
        window.fetch("http://localhost:9000/product/api/post",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            .then((response) => response.json())
            .then((productData) => {
                console.log(productData)
                dispatch(AddProductToStore(productData))
            })
            .catch((err) => {
                console.log("error while SaveProductToDB: ", err)
            })
    }
}
