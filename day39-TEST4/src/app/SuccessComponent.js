//create a React component using class

import React, { Component } from "react";

import "./test.css";
import SuccessChildComponent from "./SuccessChildComponent";
import SuccessStoryComponent from "./SuccessStoryComponent";

export default class SuccessComponent extends Component {

    constructor(props) 
    {
        super(props);
        
        this.state = 
        {
            sId: "Id"
        }; 
    }

    updateId = (value) => 
    {
        this.setState({ //creates new virtual DOM, so that it renders only when there is a real change.
            sId: value
        })
    }

    render() 
    {
        return (
            <div className="topdiv">
                <h2>SuccessComponent</h2>
                <SuccessChildComponent Name = {"PARENT"} Address = {"SOMEWHERE"} StoryComponent = {<SuccessStoryComponent updateIdInParent = {this.updateId}/>} />
                The value of sId sent from child to parent: {this.state.sId}
            </div>
        );
    }
}