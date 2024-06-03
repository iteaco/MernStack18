import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SaveUserToDB, SaveUserToDBUsingFetch } from "../../../state/User/userAction";

/* 
useState: is used to create state for each option. 
It returns a stateful value, and a function to update it. 

@example:

let [userName, setUserName] = useState("Dummy");

later in the code: 

setUserName("new value");

=================

useRef: is used to initialize with store/reducer data and then allow to update. 
It returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
The returned object will persist for the full lifetime of the component.
Note that useRef() is useful for more than the ref attribute. 
It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.

@example:

let userName = useRef("Dummy");

later in the code: 

userName.current.value = "new value";

=================

useEffect: Accepts a function that contains imperative, possibly effectful code.
@param effect — Imperative function that can return a cleanup function
@param deps — If present, effect will only activate if the values in the list change.

=================

useSelector: A hook to access the redux store's state. 
This hook takes a selector function as an argument. The selector is called with the store state.
This hook takes an optional equality comparison function as the second parameter that allows you 
to customize the way the selected state is compared to determine whether the component needs to be re-rendered.

@param selector — the selector function
@param equalityFn — the function that will be used to determine equality
@returns — the selected state

@example:

import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}

=================

useDispatch: A hook to access the redux dispatch function.
@returns — redux store's dispatch function

@example:

import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
  return (
    <div>
      <span>{value}</span>
      <button onClick={increaseCounter}>Increase counter</button>
    </div>
  )
}
*/

//===Functional Component with Hooks:

let UserHook = (props) => 
{
    //===In a controlled way:

    //subscribe and read from userReducer by using useSelector

    let User = useSelector((store) => store.userReducer.user); //reads the defined data in userReducer.js (store.js > userReducer.js)

    //initializes state and returns a callback which we can use to update the state. There are 2 options we can use: useState or useReducer.
    
    let [uName, setUserName] = useState(User.userName); 
    let [pass, setPassword] = useState(User.password);
    let [street, setStreet] = useState(User.street);
    let [mobile, setPhone] = useState(User.mobile);

    let onTextChange = (evt) => {
        let val = evt.target.value;
        setUserName(val);
        evt.preventDefault();
    }

    let dispatchToDB = useDispatch(); //useDispatch() returns the dispatch function from the Redux store. //this makes the component as publisher for the data back to store, which is to dispatch an action.

    let loginUser = (evt) => {
        let newUser = {
            userName: uName,
            password: pass,
            street,
            mobile
        }
        
        //dispatchToDB(SaveUserToDB(newUser)); //dispatch the action "SaveUserToDB", which is in userAction.js, to store. Store delivers to all reducers (reducers are configured in store.js). reducers should  respond with new state to store, if no state change, return existing state as it is.
        
        //===another way by using window.fetch() instead of axios.post()
        
        dispatchToDB(SaveUserToDBUsingFetch(newUser)); //dispatch the action "SaveUserToDBUsingFetch", which is in userAction.js, to store. Store delivers to all reducers (reducers are configured in store.js). reducers should  respond with new state to store, if no state change, return existing state as it is.
        
        evt.preventDefault();
    }

    //===In an uncontrolled way:

    //the reference implemenation
    let sessionName = useRef(null); 
    let todaysTopic = useRef(null); 

    //sessionName.current.value = User.userName; //we can't access this element here yet because it is not rendered yet. Use it in useEffect().

    //default it is shouldcomponentUpdate
    //when first rendering is done and UI can be accessed - componentDidMount
    //useeffect is the hook that we use to make it work as shouldComponentUpdate, componentDidMount, componentWillUnmount

    useEffect(() => {
        console.log("Re render happend")

        sessionName.current.value = User.userName

        //componentWillUnmount
        return () => {
            //clear intervals, api subscription etc that should be removed before we move to next component
            console.log("Makes use effect to work for componentWillUnmount")
        }

    }, []) //if we pass an object to initialize it works as componentDidMount, and executes in create lifecycle, else works as shouldComponentUpdate

    let readFormData = (evt) => {
        alert(sessionName.current.value);

        //can be dispatched data back to the store or db

        evt.preventDefault();
    }

    return (
        <>
            <h1>User Login Page</h1>

            {/* In a controlled way */}

            <section className={"componentClass"}>
                <div className="form col-md-8">
                    <div className="col-md-12">
                        <b>User Name</b>
                        <input type="text" className="form-control col-md-6 username"
                            value={uName} //state to update the userName
                            placeholder="User Name" onChange={onTextChange} maxLength={40} /> {/* passing a function as argument  */}
                    </div>
                    <div className="col-md-12">
                        <b>Password</b>
                        <input type="password" className="form-control col-md-6 pass"
                            value={pass}
                            placeholder="Password" onChange={(evt) => setPassword(evt.target.value)} maxLength={40} /> {/* passing arrow function as argument directly. evt.preventDefault() is not needed here. */}
                    </div>
                    <div className="col-md-12">
                        <b>Street </b>
                        <input type="text" className="form-control col-md-6 street"
                            value={street}
                            placeholder="Street Name" onChange={(evt) => setStreet(evt.target.value)} />
                    </div>

                    <div className="col-md-12">
                        <b>Mobile </b>
                        <input type="number" className="form-control col-md-6 mobile"
                            value={mobile} placeholder="Mobile" maxLength={11}
                            onChange={(evt) => setPhone(evt.target.value)} />
                    </div>
                    <input type="button" className={"btn btn-primary col-md-2 saveUser"}
                        value={"SignIn-Up"}
                        onClick={loginUser} />
                </div>
            </section>

            {/* In an uncontrolled way by using ref keyword */}
                                 
            <form className={"form col-md-10 userHook"} onSubmit={readFormData}>
                <label>
                    <b>User Name :</b>
                    <input type="text" className={"form-control col-md-12"} ref={sessionName}
                        placeholder="Please enter session name" maxLength={20} required />
                </label>
                <br />
                <label>
                    <b>Password :</b>
                    <input type="password" className={"form-control col-md-12"} ref={todaysTopic}
                        placeholder="Please enter today's topic" maxLength={20} required />
                </label>
                <br />
                <input type="submit" className={"btn btn-primary"} value="Signin" />
            </form> 
            
        </>
    )
}

export default UserHook;
