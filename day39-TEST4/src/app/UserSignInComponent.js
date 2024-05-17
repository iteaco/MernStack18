//create a React component using class, in an uncontrolled way of data submission

import React, { Component } from "react";

import "./test.css";

export default class UserSignInComponent extends Component {

    constructor(props) 
    {
        super(props);
        
        this.state = 
        {
            sUsername: "Username", 
            sPassword: "Password"
        }; 

        //to access and update the HTML directly (NOT recommended) without going through the state.
        
        this.rUsername = React.createRef(); //this creates a reference which we link with HTML and then access it.
        this.rPassword = React.createRef();
    }

    formSubmit = (evt) => 
    {            
        this.setState({
            sUsername: this.rUsername.current.value,
            sPassword: this.rPassword.current.value            
        })
        
        //default behaviour of form is to submit but we can stop that by using evt.preventDefault
        evt.preventDefault(); //prevent it from going to the endpoint of the action attribute in the <form>
    }

    render() 
    {
        return (
            <div className="topdiv">
                <h2>UserSignInComponent</h2>

                {/* uncontrolled component using reference element, without going through the state. 
                There are scenarios where we need to update HTML directly by using Ref, which is a uncontrolled way, even though it is NOT recommended. 
                This is NOT involved with the state, so when there is a change in state, your data will be lost. */}

                {/* The following is an example of uncontrolled way of data submission */}

                <form className="form" action="/api/loginuser" method="post" onSubmit={this.formSubmit}> {/* when not specifying the endpoint for the action attribute, the endpoint will be the current page URL */}
                     <b>Address</b>
                     <input type="text" ref={this.rUsername}></input> {/* This input allows you to type, no use of onChange and nothing is rendered. When we submit the form, we setState to change the state, which will do the rendering.*/}
                     <b>Age</b>
                     <input type="password" ref={this.rPassword}></input> {/* This input allows you to type, no use of onChange and nothing is rendered. When we submit the form, we setState to change the state, which will do the rendering.*/}
                     <button type="submit" >Save</button>
                 </form>

                 <label>The username is: {this.state.sUsername}</label>
                 <br/>
                 <label>The password is: {this.state.sPassword}</label>
            </div>
        );
    }
}