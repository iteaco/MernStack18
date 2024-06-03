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

let initialState =
{
    product:
    {
        name: "Name",
        price: 0.00,
        desc: "Description",
        rating: 1
    }
}

// action contains type and payload. payload will be assigned to the state, such as to "product".

let productReducer = (state = initialState, action) => 
{ 
    console.log("current product state: ", state);
    console.log("current product ...state: ", {...state}); //same as above
    /*example:
    {
        "product": {
            "name": "Name",
            "price": 0,
            "desc": "Description",
            "rating": 1
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
        case actionTypes.ADD_PRODUCT_TO_STORE:

            //...state is to extract all the states (properties) present in store.
            //action.payload is the new product data that we need to add to store.
            //(product: action.payload) is to set product = action.payload.

            return { ...state, product: action.payload }; //new state dispatched to store upon update. This new state is automatically passed to all the subscribed components.

        default:

            return state; //if no action type matched, return current state.
    }
}

export default productReducer;
