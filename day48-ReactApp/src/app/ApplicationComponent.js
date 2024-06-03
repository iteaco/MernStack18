//create a React component

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./test.css";
import "./app.css";

import Home from "./CommonComponent/HomeComponent";
import Footer from "./CommonComponent/FooterComponent";

import Header from "./CommonComponent/HeaderComponent";
import About from "./CommonComponent/AboutComponent";
import NotFound from "./CommonComponent/NotFoundComponent";

//import UserComponent from "./Application/User/UserComponent"; //change to the line below to use Container-base architecture
import UserComponent from "./Application/User/UserContainer";
import UserHook from "./Application/User/UserHookComponent";

import ProductHookComponent from "./Application/Product/ProductHookComponent";
import CartHookComponent from "./Application/Cart/CartHookComponent";

export default class ApplicationComponent extends Component {

    //By default in constructor, we have props.
    //Props is the set of properties (html + js) which needs to be available in every component.
    //A parent component can share data to its child by using props.

    constructor(props) 
    { 
        super(props);//syncs the props values to parent/base class.

        //define the state and initialize the state:

        this.state = { //"this" refers to the class ApplicationComponent
            name: "Suyash" //set name here instead of in the render() function.
        }
    }

    updateName = (evt) => {

        //We should NOT update HTML directly in here because it will render twice:
        /*
        let nameElem = document.getElementById("name_element")
        nameElem.innerText = "Yao"
        nameElem.innerText = "David"

        //or

        this.state.name = "Yao"; //this updates the this.state.name but will NOT update in the UI
        */

        //We should update state by creating new virtual DOM using setState api

        this.setState({ //creates new virtual DOM, so that it renders only when there is a real change.
            //name: "Yao"
            name: evt
        })
    }
        
    render() {
        return (
            <Router>
                <div className="topdiv">

                    <Header userName = {this.state.name}/>
                     
                    {/* ===These will always show regardless of the URL route */}

                    {/* 
                    <Home parentName={this.state.name} /> 
                    <About />  
                    */}

                    {/* ===These will show according to the URL route */}
                                                        
                    {/* If you want to pass the props, use element instead of Component: */}

                    <Routes>
                        {/* This will only show when the URL route matches the path: http://localhost:9090 */}
                        <Route path="/" element={<Home  parentName1={this.state.name} updateNameInParent={this.updateName} /> }/> {/* we can pass function updateName() to props. This is a callback */}
                        {/* In the line above, we intentionally pass in wrong property for the props: parentName1 instead of parentName (to demonstrate the use of defaultProps) */}

                        {/* This will only show when the URL route matches the path: http://localhost:9090/home */}
                        <Route path="home" element={<Home parentName={this.state.name} updateNameInParent={this.updateName} />} /> {/* we can pass function updateName() to props. This is a callback */}

                        {/* <Route path="user" element={<UserComponent />}/> */} {/* NavLink user is already defined in src\app\CommonComponent\HeaderComponent.js */}
                        <Route path="user" element={<UserHook />}/> {/* Comment out the line above to use <UserHook/>, which is a functional component, while <UserComponent/> above is a class component. */}

                        <Route path="product" element={<ProductHookComponent />}/>
                        <Route path="cart" element={<CartHookComponent />}/>

                        {/* This will only show when the URL route matches the path: http://localhost:9090/about */}
                        <Route path="about" element={<About />} /> 

                        {/* This will only show when the URL route matches the path: http://localhost:9090/about/2500 */}
                        {/* "about/:id" matches the "id" used in AboutComponent.js */}
                        <Route path="about/:id" element={<About />} />
                        
                        {/* This will only show when the URL route does NOT match any path */}
                        <Route path="*" element={<NotFound />}/> 
                    </Routes>

                    <Footer />

                </div>
            </Router>
        )
    }

}
