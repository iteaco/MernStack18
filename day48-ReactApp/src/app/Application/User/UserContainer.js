//Instead of having everything in 1 file .js, we divide it into 2 files:  _Component.jsx & _Container.js
//Container is not a necessity, but we use Container separate things for easy coding.
//.jsx files should contain only the View part (HTML, Render). Actions should be in the Container files of .js
//_Component.jsx contains only JSX code

//create the connect method and add that to the component.
//this contains react-redux part, not the component part.
//part of UserComponent.js, the one that is NOT component, is moved to this file. 

import { connect } from "react-redux"; //is used to connect (subscribe) component to the store. Only then we can use the props from the store
import { AddUserToStore, SaveUserToDB } from "../../../state/User/userAction";

import UserComponent from "./UserComponent.jsx"; //===everything in this file is moved from UserComponent.jsx, except this line. NOTE: make sure to include the .jsx extension

//=======================for using with store

//mapstatetoprops -- allows component to become subscriber

let mapStateToProps = (store) => { //store is the redux states
    return {
        user1: store.userReducer.user //assign store.userReducer.user to prop user1. store.userReducer.user is in file src\state\User\userReducer.js.
        //user1 will be accessed as props.user1 in component.
    }
}

//mapDispatchToProps -- allows us to send data back to store to update in reducer. 

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => { //user is the payload 
            dispatch(AddUserToStore(user)) //AddUserToStore is an action imported from userAction.js. Dispatch dispatches this action to store. Store delivers to all reducers (reducers are configured in store.js). reducers should  respond with new state to store, if no state change, return existing state as it is.
            //dispatch(() => AddUserToStore(user)) //passing as arrow function to be executed later, not immediately like above
        },
        loginUser: (user) => {
            dispatch(SaveUserToDB(user)) //SaveUserToDB is an action imported from userAction.js. Dispatch dispatches this action to store. Store delivers to all reducers (reducers are configured in store.js). reducers should  respond with new state to store, if no state change, return existing state as it is.
        }
    }
}

//connect() accepts mapStateToProps for subscribing and mapDispatchToProps for publishing between the Component & the Store

//export default connect(mapStateToProps, null)(UserComponent); 
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);

/*
Dispatch 
•   Dispatch is the only  way to call reducers 
•   Dispatch dispatches actions to store. Store  deliver to all reducers. 
•   Upon receiving actions, reducers should  respond with new state to store, if no state change,  return existing state as it is. 

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
