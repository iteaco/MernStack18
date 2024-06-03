console.log("This is the first file in front end application !!!");

import React from "react";
import * as ReactDOM from "react-dom/client";

import { Provider } from "react-redux"; //Provider is used to set the store as top level component of react application
import store from "./state/store"; //The store to be passed to the Provider.

import ApplicationComponent from "./app/ApplicationComponent";

//creating root of the react application where we can load the react app

const root = ReactDOM.createRoot(document.getElementById("root")); //ReactDOM is the 2nd Virtual DOM

//bootstrapping react application in root element of index.html

/*
root.render( //This is render() of the 2nd Virtual DOM using Diffing Algorithm to compare to the 1st Virtual DOM, which is present with the real DOM in the browser. If there is a real change, then render only the changed stuff, not everything, in the real DOM. If there is no real change, do not render.
    
    <ApplicationComponent />

);
*/

root.render( //This is render() of the 2nd Virtual DOM using Diffing Algorithm to compare to the 1st Virtual DOM, which is present with the real DOM in the browser. If there is a real change, then render only the changed stuff, not everything, in the real DOM. If there is no real change, do not render.
    
    <Provider store={store}> {/* Provider is used to set the store as top level component of react application. This makes the store the parent of every component. */}
        <ApplicationComponent />
    </Provider>

);
