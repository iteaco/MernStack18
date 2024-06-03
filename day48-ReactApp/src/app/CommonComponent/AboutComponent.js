import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

//Function Component using arrow function:

let About = () => {

    let params = useParams(); 
    let param = params && params["id"] ? params["id"]: "No Params"; //if params is not undefine and params["id"] is not undefined, return params["id"], else return "No Params"

    //===in Class Component: update all states in batch
    //this.state = {userName: "Joe Si", userAge: 20};
    //this.setState({userName: "Suyash", userAge: 21});

    //===in Function Component: set each state individually 
    
    let [userName, setUserName] = useState("Joe Si"); //userName is the variable. setUserName is the callback function to update variable userName.
    //let [userAge, setUserAge] = useState(20);  
    //let [user, setUser] = useState({userName: "Joe Si", userAge: 20}); //as object instead of individual fields   
    
    //first hook that we are using in application:

    let goToHome = useNavigate(); //helps to create route table on the fly and intercepted by BrowserRouter

    let onGoToHomeClick = (evt) => 
    {
        //goToHome("/home");

        setUserName("Suyash");
        //setUserAge(21);
        //setUser({userName: "Suyash", userAge: 21}); //as object instead of individual fields 
        
        evt.preventDefault(); //it stops the default behaviour like event propagation
    }

    //==================================

    return ( //return is same as render()
        <div className="about" >
            <h2>We promise to support .... </h2>
            <p className="about-content">If you’re looking for a job—a great job—we can help
                you get in the door at some incredible companies.
                Need to hire good people? We know thousands.
                Let us introduce you. No matter where you are,
                we can help you get where you want to go in your career.
            </p>
            <p>id = {param}</p>
            <p>Sum of Params = {param + param}</p>
            <p>Multiple of Params = {param * param}</p>

            <button className={"btn btn-primary col-md-11"} onClick={onGoToHomeClick}>Go To Home</button>

            <h4>{userName}</h4>
        </div>
    )
}

export default About;