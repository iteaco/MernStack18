/*
Reducers 
•   Manages application state changes 
•   Reducers called with current state with action 
•   Redux stores all the data in one single object 
•   (previousState, action) => newState 
•   Every Action produces new state, i.e. you should  not mutate the state 

•   Given the same arguments, it should calculate the  next state and return it. 
•   No surprises. 
•   No side effects. 
•   No API calls. 
•   No mutations. Just a calculation. 

for example:

const INITIAL_STATE = 0
function counterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "INCREMENT": {
            return state + action.payload.value
        }
        case "DECREMENT": {
            return state - action.payload.value
        }
        case "RESET": {
            return INITIAL_STATE
        }
        default:
            return state;
    }
}
*/

import * as actionTypes from "../actionTypes";

let initialState = {
    user: {
        userName: "Name",
        password: "Pass",
        street: "Somewhere",
        mobile: 11111,
        products: [] //empty array
    }
}

// action contains type and payload. payload will be assigned to the state, such as to "user".

let userReducer = (state = initialState, action) => 
{
    console.log("current user state: ", state);
    console.log("current user ...state: ", {...state}); //same as above
    /*example:
    {
        "user": {
            "_id": "66574fb43f64d249dfadef00",
            "userName": "a",
            "password": "Pass",
            "street": "Somewhere",
            "mobile": 11111,
            "hobbyName": ""
        }
    }
    */

    console.log("action: ", action); //when an action is dispatched, it goes to all the Reducers regardless whether it is relevant or not.
    /*example:
    {
        "type": "STORE.ADDUSER",
        "payload": {
            "userName": "b",
            "password": "b",
            "street": "b",
            "mobile": 2,
            "_id": "665ccdafcd8e6dc12e9f3c73"
        }
    }
    */

    switch (action.type) 
    {
        case actionTypes.ADD_USER_TO_STORE:

            //...state is to extract all the states (properties) present in store.
            //action.payload is the new user data that we need to add to store.
            //(user: action.payload) is to set user = action.payload.

            return { ...state, user: action.payload }; //new state dispatched to store upon update. This new state is automatically passed to all the subscribed components.

        case actionTypes.INSERT_PRODUCT_TO_USER:

            const currentUser = {...state.user}; //creates a copy of the current user in store
            const productId = action.payload; //action.payload should contain the _id of a product

            if (currentUser.hasOwnProperty("products") == false) { //if this property "products" does not exist
                console.log("property products does not exist");
                currentUser.products = []; //create property "products" and assign an empty array to it
            }

            currentUser.products = [...currentUser.products, productId]; //create an array [] which contains all elements of currentUser.products (...currentUser.products) and append productId to it, then assign this array to currentUser.products
   
            return { ...state, user: currentUser }; //assigning the modifed currentUser back to the user in store

        default:

            return state; //if no action type matched, return current state.
    }
}

export default userReducer;
