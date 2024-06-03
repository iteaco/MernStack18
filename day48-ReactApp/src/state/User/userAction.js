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

export const AddUserToStore = (user) => 
{
    return {
        type: actionTypes.ADD_USER_TO_STORE, //the actionType to be matched in userReducer.js
        payload: user //the payload which will update the user state
    }
}

//==============================

//server call to save user to MongoDB and do sign-in or sign up

export const SaveUserToDB = (newUser) => 
{
    return (dispatch) => {
        axios.post("http://localhost:9000/user/api/signinup", //uri or end point of singninup api
            newUser // the user state object we dispatch from the user component
        )
            .then((collection) => { //if there is no error
                let loggedUser = collection.data
                console.log(loggedUser)
                dispatch(AddUserToStore(loggedUser))
            })
            .catch((err) => { //if there is error
                console.log("error while logging in ", err)
            })
    }
}

//===another way to SaveUserToDB by using Fetch

export const SaveUserToDBUsingFetch = (newUser) => {
    return (dispatch) => {
        window.fetch("http://localhost:9000/user/api/signinup",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then((response) => response.json())
            .then((userData) => {
                console.log(userData)
                dispatch(AddUserToStore(userData))
            })
            .catch((err) => {
                console.log("error while logging in ", err)
            })
    }
}

//==============================

export const InsertProductToUserStore = (productId) => {
    return {
        type: actionTypes.INSERT_PRODUCT_TO_USER, //the actionType to be matched in userReducer.js
        payload: productId //the payload which will update the user state
    }
}

export const InsertProductToUserDB = (userInfo) => {
    console.log("userInfo in InsertProductToUserDB", userInfo);

    return (dispatch) => {
        axios.post(
            "http://localhost:9000/user/api/insertProduct", //uri or end point 
            userInfo //request data
        )
            .then((responseData) => { //if there is no error
                console.log("Response data from API in InsertProductToUserDB" , responseData.data);
            })
            .catch((err) => { //if there is error
                console.log(err);
            })
    }
}
