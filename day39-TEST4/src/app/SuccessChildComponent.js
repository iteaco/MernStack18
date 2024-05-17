//create a React component using function

import React, { Component } from "react";

import "./test.css";

let SuccessChildComponent = (props) => {
    return ( //return is same as render()
        <div className="topdiv">
            <h3>SuccessChildComponent with props Name ({props.Name}) and Address ({props.Address}) and Story Component: {props.StoryComponent} from parent.</h3>
        </div>
    )
}

export default SuccessChildComponent;
