import React, { Component, PureComponent} from "react";

import {PropTypes} from "prop-types";

//export default class Home extends PureComponent //PureComponent implements shouldComponentUpdate() in itself to reduce the unnecessary render() on state change
export default class Home extends Component
{    
    //================================
    //===Creation life cycle methods

    constructor(props) //belongs to Creation life cycle.
    {
        super(props);
        
        //this.state = {age: 17, userName: "Default"};
        this.state = 
        {
            age: 17, 
            userName: props.parentName, 
            refAddress: "ref Address", 
            refAge: "ref Age"
        }; //usage example: <Home  parentName={this.state.name}/>

        //props.parentName = "something"; //Error because props is readonly.

        this.incrementAgeLoop = null;
        this.incrementAgeVal = 17;
        //this.incrementAge(); //function call

        //to access and update the HTML directly (NOT recommended) without going through the state.
        
        this.address = React.createRef(); //this creates a reference which we link with HTML and then access it.

        this.age = React.createRef();
    }

    incrementAge = () => 
    {        
        this.incrementAgeLoop = setInterval(() => //setInterval() executes every interval of time, in this case 1 second
        { 
            this.incrementAgeVal++;

            this.setState({
                //age: this.state.age + 1
                age: this.incrementAgeVal
            })

            //console.log(this.state.age);
            console.log(this.incrementAgeVal);

        }, 1000) //runs every 1 second forever unless it is cleared by clearInterval()

        /*
        setTimeout(()=>{
            clearInterval(this.incrementAgeLoop); //clear the interval to stop it from executing
        }, 5000) //runs once after 5 seconds
        */
    };

    componentDidMount() //executes only after the first render()
    {
        //We can access the HTML and make calls to server API here to pull the data.
        /*
        setTimeout(() => {
            this.address.current.value = "New name with reference"; //Here, we update the value in the HTML directly, without creating the virtual DOM, without going through the state, so the problem is it does NOT bind data to the state. 
                                                                    //current is the current value of the ref. 
        }, 2000) //runs once after 2 seconds
        */
    }

    //================================
    //===Destruction life cycle method

    componentWillUnmount() //this is executed when we move to another route.
    {
        //any api subsriptions, loops should be stopped here as this data may create mess.

        console.log("componentWillUnmount - is called");

        clearInterval(this.incrementAgeLoop); //clear the interval to stop it from executing
    }

    //================================
    //===Update life cycle methods

    //Comment out shouldComponentUpdate() when using PureComponent because PureComponent already implements it internally:
    
    shouldComponentUpdate(nextPops, nextState) //If this method is not present, it returns true by default. But if it is present, you must return true/false manually.
    {
        console.log("nextPops ", nextPops);
        console.log("nextState ", nextState); //nextState contains the new values

        if (this.state.age == nextState.userName) { //if it is the same value, we don’t want to call render()
            return false; // do not call render() method to create virtual DOM
        } else {
            return true; // keep calling render() method     
        }
    }
    
    onTextChange = (evt) => //evt -is js object which contains information about the control which invoked this event
    {
        let element = evt.target;

        let value = element.value;
        let classList = element.classList; //list of CSS classes that are present in that HTML element

        if (classList.contains("userName")) {
            //We can use regex to check the email to see if value is a valid email, then we can setState
            this.setState({
                userName : value
            })
        } else {
            //We can use regex to check the number like below:
            let newVal = value < 110 ? value : 0; //when we type new value that is >= 110, it will become 0

            this.setState({
                age : newVal
            })
        }

        console.log(value);

        /*
        this.setState({ //render() is called when we setState
            userName: value
        })
        */

        //update the name back in parent by calling callback event
        this.props.updateNameInParent(value); //when this executes, it is calling the updateName() in ApplicationComponent.js, which is the parent of <Home /> 
                                                //because <Home updateNameInParent={this.updateName} is used in ApplicationComponent.js
                                                //so we can use this to pass data back to parent. Here we are passing argument “value”.

        evt.preventDefault(); 
    }

    updateName = (evt) => 
    {
        debugger; //run the app and inspect it in the browser for debugging

        console.log("Updating the name to age");

        //===There are 3 ways to render to create the virtual DOM for update:

        //way 1: setState() follows with life cycle methods and update the values in batch process.

        this.setState({ //render() is called when we setState. 
            age: this.state.userName
        })

        //way 2: We can call the render() method by calling forceUpdate(), but it is NOT recommended because it skips the life cycle methods, such as shouldComponentUdpate(). 

        this.state.age = this.state.userName; //this only changes the value internally because it is not rendered on the browser.
        this.forceUpdate(); //directly calls render(), which creates the virtual DOM.

        //way 3: When there is a change in props from the parent, render() is called automatically.

        //NOTE: props can only be changed from the parent. For the child, props is readonly.

        //======================

        evt.preventDefault();
    }

    /*getSnapshotBeforeUpdate(): 
    Runs before React applies the result of render to the document, and returns an object to be given to componentDidUpdate(). 
    Useful for saving things such as scroll position before render causes changes to it.
    Note: the presence of this method prevents any of the deprecated lifecycle events from running.
    */

    getSnapshotBeforeUpdate(prevState, prevProps) //This executes before the update
    {
        console.log("getSnapshotBeforeUpdate");

        console.log("prevState", prevState); //prevState contains previous values
        console.log("prevProps", prevProps);

        return { //returns an object to be given to componentDidUpdate()
            prevState,
            prevProps
        }
    }

    /*componentDidUpdate():
    Called immediately after updating occurs. Not called for the initial render().
    The snapshot is only present if getSnapshotBeforeUpdate() is present and returns non-null.
    */

    componentDidUpdate(prevState, prevProps) //This executes after the update
    {
        console.log("componentDidUpdate");

        console.log("prevState", prevState); //prevState contains previous values
        console.log("prevProps", prevProps);
    }

    //================================

    formSubmit = (evt) => 
    {
        this.address.current.focus(); //set the cursor to focus on HTML address

        let newAdd = this.address.current.value;
        let newAge = this.age.current.value;
        //alert(newAdd + newAge);
        
        this.setState({
            refAge: newAge,
            refAddress: newAdd
        })
        
        //default behaviour of form is to submit but we can stop that by using evt.preventDefault
        evt.preventDefault(); //prevent it from going to the endpoint of the action attribute in the <form>
    }

    render() //belongs to both the Creation life cycle & the Update life cycle. It creates and updates the virtual DOM
    {
        console.log("render method called");

        return(
            // <div className="col-md-12">

            //     <h1>Home Component</h1>
            //     <h2>User Age is: {this.state.age}</h2>
                
            //     {/* The controlled way of creating a component: the state is directly coupled with the changes. The state controls the changes, so you need to change things through the shouldComponentUpdate() and setState().*/}

            //     <div className="form col-md-12">
            //         <div className="form-control">
            //             <div className="col-md-3">
            //                 <b>User Name</b>
            //             </div>
            //             <div className="col-md-6">
            //                 <input type="text" className="form-control textbox userName" value={this.state.userName} //This input does not allow you yet to type anything. This is due to the state controlling the changes, so you need to change things through the shouldComponentUpdate() and setState(). 
            //                     placeholder="Please provide user name" onChange={this.onTextChange}></input> {/*regarding onChange, every time we type a character, the whole render process is called and new virtual DOM is created.  */}  
            //             </div>

            //             <div className="col-md-6">
            //                 <input type="text" className="form-control textbox userAge" value={this.state.age} //This input does not allow you yet to type anything. This is due to the state controlling the changes, so you need to change things through the shouldComponentUpdate() and setState(). 
            //                     placeholder="Please provide age" onChange={this.onTextChange}></input> {/*regarding onChange, every time we type a character, the whole render process is called and new virtual DOM is created.  */}  
            //             </div>

            //             <div className="col-md-3">
            //                 <button className={"form-control btn btn-primary col-md-1"}
            //                     onClick={this.updateName}
            //                 >Update Name to Age</button>
            //             </div>
            //         </div>
            //     </div>

            //     {/* uncontrolled component using reference element, without going through the state. 
            //     There are scenarios where we need to update HTML directly by using Ref, which is a uncontrolled way, even though it is NOT recommended. 
            //     This is NOT involved with the state, so when there is a change in state, your data will be lost. */}

            //     {/* <input type="text" ref={this.address}></input>  */}{/* This input allows you to type, no use of onChange and nothing is rendered. */}

            //     {/* The following is an example of uncontrolled way of data submission */}

            //     <form className="form" action="/api/loginuser" method="post" onSubmit={this.formSubmit}> {/* when not specifying the endpoint for the action attribute, the endpoint will be the current page URL */}
            //          <b>Address</b>
            //          <input type="text" placeholder={"Default User Address"} ref={this.address} maxLength={20}></input> {/* This input allows you to type, no use of onChange and nothing is rendered. When we submit the form, we setState to change the state, which will do the rendering.*/}
            //          <b>Age</b>
            //          <input type="number" placeholder={"Default User Age"} ref={this.age} maxLength={20}></input> {/* This input allows you to type, no use of onChange and nothing is rendered. When we submit the form, we setState to change the state, which will do the rendering.*/}
            //          <button type="submit" >Save</button>
            //      </form>

            //      <label>{this.state.refAddress}</label>
            //      <hr/>
            //      <label>{this.state.refAge}</label>

            // </div>

            <div className={"loadimage form"} >
                <h1>{this.state.title}</h1>
                <b className="feature">{"Product Feature's :"}</b>
                <ul>
                    <li>Sign up new users</li>
                    <li>Login existing users.</li>
                    <li>Allow user's to add to cart.</li>
                    <li>Save the user's cart.</li>
                    <li>Checkout and pay for items.</li>
                    <li>Allow users to cancel the order.</li>
                    <li>Allow users to reorder the cart.</li>
                    <li>Add products/items to create product collection.</li>
                    <li>Allow users to give ratings to each product.</li>
                    <li>Have notifications on top right with logout.</li>
                </ul>
            </div>
        );
    }

}

//===================================

//set default values for the properties of props. Here, we set the default value for property "parentName". So this value will be used when no value is passed in from the parent for props.
/*
Home.defaultProps = {
    parentName : "default values for props"
}
*/

// for example:
// <Route path="/" element={<Home /> /* when there is no pass in property for props*/
// <Route path="/" element={<Home  parentNameWrong={this.state.name}/> /* when the pass in property for props has wrong name, such as parentNameWrong instead of parentName */

//===================================

//when setting to PropTypes.string.isRequired, it gives the warning in the console of the browser if a prop is not there or undefined
/*
Home.propTypes = {
    parentName : PropTypes.string.isRequired
}
*/
//for example:
//Warning: Failed prop type: The prop `parentName` is marked as required in `Home`, but its value is `undefined`.
