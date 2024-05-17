console.log("Printing from: src\index.js");

import React from "react";
import * as ReactDOM from "react-dom/client";

import ApplicationComponent from "./app/ApplicationComponent";

//creating root of the react application where we can load the react app
const root = ReactDOM.createRoot(document.getElementById("root"));

//bootstrapping react application in root element of index.html
root.render(
    <ApplicationComponent />
);
