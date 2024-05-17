//create a React component using function

import React, { Component } from "react";

import "./test.css";

let SuccessStoryComponent = (props) => {
    return ( //return is same as render()
        <div className="topdiv">
            <h3>SuccessStoryComponent</h3>
            {props.updateIdInParent("abc")} {/* calling the prop updateIdInParent = {this.updateId} in parent SuccessComponent.js */}           
        </div>
    )
}

export default SuccessStoryComponent;
