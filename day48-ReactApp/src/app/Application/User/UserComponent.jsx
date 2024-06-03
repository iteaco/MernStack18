//Instead of having everything in 1 file .js, we divide it into 2 files:  _Component.jsx & _Container.js
//Container is not a necessity, but we use Container separate things for easy coding.
//.jsx files should contain only the View part (HTML, Render). Actions should be in the Container files of .js
//_Component.jsx contains only JSX code
//The part (react-redux) that is NOT component is moved to UserContainer.js

import React, { Component } from "react";
//import { connect } from "react-redux"; //is used to connect (subscribe) component to the store. Only then we can use the props from the store
//import { AddUserToStore } from "../../../state/User/userAction";

export default class UserComponent extends Component { //for use without the store (NO connect()) or for separation of _Component.jsx & _Container.js
//class UserComponent extends Component { //for use with the store (having connect() at the end of this file)

    constructor(props) {
        super(props);

        this.state = {
            userName: props.user1.userName, // reading from store using props through container
            password: props.user1.password,
            street: props.user1.street,
            mobile: props.user1.mobile
        }
    }

    onTextChange = (evt) => {
        let target = evt.target;
        let classList = target.classList; 
        let value = target.value;

        if (classList.contains("username")) {
            this.setState({ userName: value })
        } else if (classList.contains("pass")) {
            this.setState({ password: value })
        } else if (classList.contains("street")) {
            this.setState({ street: value })
        } else {
            this.setState({ mobile: value })
        }

        evt.preventDefault();
    }

    loginUser = (evt) => { //this is an action creator
        let newUser = this.state;
        alert("Logged Innn -" + JSON.stringify(newUser));

        //upon user action to login, we send user to store.
        //newUser is passed as payload.
        //this.props.addUser(newUser); //when this line executes, it calls the dispatch(AddUserToStore(user)) in mapDispatchToProps
        //comment out the line above because here now we want to call loginUser() instead of addUser():
        this.props.loginUser(newUser) //will go to usercontainer => useraction => server(db) => store => userreducer

        evt.preventDefault();
    }

    render() {
        return (
            <>
                <h1>User Login Page</h1>
                <section className={"componentClass"}>
                    <div className="form col-md-8">
                        <div className="col-md-12">
                            <b>User Name</b>
                            <input type="text" className="form-control col-md-6 username"
                                value={this.state.userName}
                                placeholder="User Name" onChange={this.onTextChange} maxLength={40} />

                        </div>
                        <div className="col-md-12">
                            <b>Password</b>
                            <input type="password" className="form-control col-md-6 pass" value={this.state.password}
                                placeholder="Password" onChange={this.onTextChange} maxLength={40} />
                        </div>
                        <div className="col-md-12">
                            <b>Street </b>
                            <input type="text" className="form-control col-md-6 street" value={this.state.street}
                                placeholder="Street Name" onChange={this.onTextChange} />
                        </div>

                        <div className="col-md-12">
                            <b>Mobile </b>
                            <input type="number" className="form-control col-md-6 mobile" value={this.state.mobile}
                                placeholder="Mobile" maxLength="11"
                                onChange={this.onTextChange} />
                        </div>

                        <input type="button" className={"btn btn-primary col-md-2 saveUser"}
                            value={"SignIn-Up"}
                            onClick={this.loginUser} />

                    </div>
                </section>
            </>
        )
    }
}

//=========================================
//The following is moved to UserContainer.js
//=========================================
/*
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
            dispatch(AddUserToStore(user)) //this line will go to the userReducer.js. The action in userReducer.js contains 2 things (type & payload) which are defined in AddUserToStore in userActions.js
        }
    }
}

//connect() accepts mapStateToProps for subscribing and mapDispatchToProps for publishing between the Component & the Store

//export default connect(mapStateToProps, null)(UserComponent); 
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
*/