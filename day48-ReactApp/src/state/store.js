//store is a redux object which helps us handle state changes.
//reducer is a function which works with switch case (for each action type) and updates the state, for every change returns new state.
//Each component will have its respective reducer.
//action is the object a reducer accepts to create a new state.
//action is an object that contains action type (ex: increment) and payload (ex: + 5). 

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./User/userReducer";
import productReducer from  "./Product/productReducer"; 
//import cartReducer from  "./Cart/cartReducer"; 

//===Store accesses only one reducer, so we need to combine all reducers (if we have more than one) into one reducer.

/*
let rootReducer = combineReducers({
    userReducer: userReducer,         //here we have only 1 reducer
    productReducer: productReducer,   //if we also have other reducers
    //cartReducer: cartReducer 
})
*/

//using short hand for the above:

let rootReducer = combineReducers({
    userReducer,            //here we have only 1 reducer
    productReducer,         //if we also have other reducers
    //cartReducer       
})

//==================================

//create or configure and export the store from this code

export default configureStore(
    { reducer: rootReducer },
    {}, //inital state if we want to set from store instead of reducer
)
