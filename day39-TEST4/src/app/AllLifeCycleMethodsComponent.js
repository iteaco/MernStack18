import React, { Component, PureComponent} from "react";

//export default class AllLifeCycleMethodsComponent extends PureComponent //PureComponent implements shouldComponentUpdate() in itself to reduce the unnecessary render() on state change
export default class AllLifeCycleMethodsComponent extends Component
{    
    //================================
    //===Creation life cycle methods

    constructor(props) //belongs to Creation life cycle.
    {
        super(props);

        this.state = 
        {
            age: 17, 
            userName: "userName"
        }; 
    }

    componentDidMount() //executes only after the first render()
    {
        //We can access the HTML and make calls to server API here to pull the data.        
    }

    //================================
    //===Destruction life cycle method

    componentWillUnmount() //this is executed when we move to another route.
    {
        //any api subsriptions, loops should be stopped here as this data may create mess.
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
        this.setState({ //render() is called when we setState
            userName: evt.target.value
        })
        
        evt.preventDefault(); 
    }

    updateName = (evt) => 
    {
        this.setState({ //render() is called when we setState. 
            age: this.state.userName
        })

        evt.preventDefault();
    }

    /*getSnapshotBeforeUpdate(): 
    Runs before React applies the result of render to the document, and returns an object to be given to componentDidUpdate(). 
    Useful for saving things such as scroll position before render causes changes to it.
    Note: the presence of this method prevents any of the deprecated lifecycle events from running.
    */

    getSnapshotBeforeUpdate(prevState, prevProps) //This executes before the update
    {
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
    }

    //================================

    render() //belongs to both the Creation life cycle & the Update life cycle. It creates and updates the virtual DOM
    {
        console.log("render method called");

        return(
            <div>
                <h2>AllLifeCycleMethodsComponent</h2>

                {/* The controlled way of creating a component: the state is directly coupled with the changes. The state controls the changes, so you need to change things through the shouldComponentUpdate() and setState().*/}

                <div className="form col-md-12">
                    <div className="form-control">
                        <div className="col-md-3">
                            <b>User Name</b>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control textbox userName" value={this.state.userName} //This input does not allow you yet to type anything. This is due to the state controlling the changes, so you need to change things through the shouldComponentUpdate() and setState(). 
                                placeholder="Please provide user name" onChange={this.onTextChange}></input> {/*regarding onChange, every time we type a character, the whole render process is called and new virtual DOM is created.  */}  
                        </div>
                        <div className="col-md-3">
                            <b>Age</b>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control textbox userAge" value={this.state.age} //This input does not allow you yet to type anything. This is due to the state controlling the changes, so you need to change things through the shouldComponentUpdate() and setState(). 
                                placeholder="Please provide age" onChange={this.onTextChange}></input> {/*regarding onChange, every time we type a character, the whole render process is called and new virtual DOM is created.  */}  
                        </div>

                        <div className="col-md-3">
                            <button className={"form-control btn btn-primary col-md-1"}
                                onClick={this.updateName}
                            >Update Name to Age</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
