//create a React component using class

import React, { Component } from "react";

import "./test.css";
import SuccessComponent from "./SuccessComponent";
import UserSignInComponent from "./UserSignInComponent";
import AllLifeCycleMethodsComponent from "./AllLifeCycleMethodsComponent";

export default class ApplicationComponent extends Component {

    render() 
    {
        return (
            <div className="topdiv">
                <h1>ApplicationComponent</h1>
                <SuccessComponent/>
                <UserSignInComponent/>
                <AllLifeCycleMethodsComponent/>
            </div>
        );
    }
}
