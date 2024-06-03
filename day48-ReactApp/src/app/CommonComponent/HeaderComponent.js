import React from "react";

//This file, which is a component, uses <NavLink>. So any file that uses this component, which is named <Header/>, must surround it with <Router>

import { NavLink } from "react-router-dom"; //For navigation links. It is similar to <a> tag for links but is much better.

import { useSelector } from "react-redux"; //this hook is a replacement of mapStateToProps

let Header = (props) => {

    //useSelector allows us to read data from store/reducer as we do with mapStateToProps.
    
    const user = useSelector((store)=>store.userReducer.user); //This line makes "const user" subscribes to the user state of the userReducer
    console.log(user);
    const usrName = user && user.userName ? user.userName : props.userName;

    return ( //return is same as render()
        <>
            {/* <h2>Header Component</h2> */}
            
            {/* <h3>The value of props.userName is: {props.userName}</h3> */}

            <h2>Hi {usrName} , Welcome to Shopping Cart sponsored by Tech Team SIT</h2>

            <NavLink to="/home"  className="button"> Home </NavLink> 
            <NavLink to="/user"  className="button"> User </NavLink>

            <NavLink to="/product"  className="button"> Product </NavLink>
            <NavLink to="/cart"  className="button"> Cart </NavLink>

            <NavLink to="/about"  className="button"> About </NavLink>
            {/* <NavLink to="/about/2500"  className="button"> About with param 2500 </NavLink> */}

            <hr/>
        </>
    )
}

export default Header;