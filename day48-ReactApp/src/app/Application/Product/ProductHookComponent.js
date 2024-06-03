import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SaveProductToDB, SaveProductToDBUsingFetch } from "../../../state/Product/productAction";
import { InsertProductToUserStore } from "../../../state/User/userAction";

/* 
useState: is used to create state for each option. 
It returns a stateful value, and a function to update it. 

@example:

let [userName, setUserName] = useState("Dummy");

later in the code: 

setUserName("new value");

=================

useRef: is used to initialize with store/reducer data and then allow to update. 
It returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
The returned object will persist for the full lifetime of the component.
Note that useRef() is useful for more than the ref attribute. 
It’s handy for keeping any mutable value around similar to how you’d use instance fields in classes.

@example:

let userName = useRef("Dummy");

later in the code: 

userName.current.value = "new value";

=================

useEffect: Accepts a function that contains imperative, possibly effectful code.
@param effect — Imperative function that can return a cleanup function
@param deps — If present, effect will only activate if the values in the list change.

=================

useSelector: A hook to access the redux store's state. 
This hook takes a selector function as an argument. The selector is called with the store state.
This hook takes an optional equality comparison function as the second parameter that allows you 
to customize the way the selected state is compared to determine whether the component needs to be re-rendered.

@param selector — the selector function
@param equalityFn — the function that will be used to determine equality
@returns — the selected state

@example:

import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}

=================

useDispatch: A hook to access the redux dispatch function.
@returns — redux store's dispatch function

@example:

import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
  return (
    <div>
      <span>{value}</span>
      <button onClick={increaseCounter}>Increase counter</button>
    </div>
  )
}
*/

//===Functional Component with Hooks:

const ProductHookComponent = (props) => {
    //debugger;

    //==========================
    //===In a controlled way:
    //==========================

    //subscribe and read from productReducer by using useSelector
    //NOTE: This variable type must NOT be "const" because it needs to be changed.
    let product = useSelector((store) => store.productReducer.product); //reads the defined data in productReducer.js (store.js > productReducer.js) 

    //initializes state and returns a callback which we can use to update the state. There are 2 options we can use: useState or useReducer.
    //NOTE: These variable types must NOT be "const" because they need to be changed.
    let [sProductName, setProductName] = useState(product.name);
    let [sProductPrice, setProductPrice] = useState(product.price);
    let [sProductDesc, setProductDesc] = useState(product.desc);

    const onTextChange = (evt) => //for sProductName only
    {
        setProductName(evt.target.value);
        evt.preventDefault();
    }

    //useDispatch() returns the dispatch function from the Redux store. //this makes the component as publisher for the data back to store, which is to dispatch an action.

    const dispatchStore = useDispatch();

    //To call a function on click event, use either the addEventListener() method or the onClick event attribute.
    //The following function will be called using the onClick event attribute (scroll down to the render() method to see it)

    const postProduct = (evt) => {
        const newProduct =
        {
            name: sProductName,
            price: sProductPrice,
            desc: sProductDesc,
            rating: rRating.current.value
        }

        //to dispatch the action "SaveProductToDB", which is in productAction.js, to store. 
        //Store delivers to ALL reducers (reducers are configured in store.js). 
        //Reducers, based on the switch case actionTypes to determine if this data belongs to them, should respond with new state to store, if no state change, return existing state as it is.

        //dispatchStore(SaveProductToDB(newProduct)); 
        dispatchStore(SaveProductToDBUsingFetch(newProduct));

        evt.preventDefault();
    }

    //==========================
    //===In an uncontrolled way:
    //==========================

    //NOTE: This variable type must NOT be "const" because it needs to be changed.
    let rRating = useRef(); //intialized value does NOT work here, such as useRef(5) 
    //rRating.current.value = product.rating; //we can't access this element here yet because it is not rendered yet. Use it in useEffect() as below:
    useEffect(() => {
        console.log("render happened");
        rRating.current.value = product.rating; //to set the value for useRef variable
    }, []); //empty [] to run once when the component mounts. Without the empty [], useEffect is triggered after every render, which makes it run forever.

    //==========================
    //==========================
    //==========================

    //NOTE: This variable type must NOT be "const" because it needs to be changed.
    let [data, setData] = useState([]); //[] as an empty array 

    useEffect(() => {
        fetch("http://localhost:9000/product/api/getAll")
            .then((resp) => resp.json())
            .then((apiData) => {
                setData(apiData);
            });
    }, [data]); //Only re-run the effect if data changes //this is also to re-render when data changes
    
    const addProductToCart = (event, productId) => 
    {
        event.preventDefault();

        //to dispatch an action to Store. 
        //Store delivers to ALL reducers (reducers are configured in store.js). 
        //Reducers, based on the switch case actionTypes to determine if this data belongs to them, should respond with new state to store, if no state change, return existing state as it is.

        //console.log("productId", productId);
        dispatchStore(InsertProductToUserStore(productId));
    }

    //==========================
    //==========================
    //==========================

    return (
        <div className="container-fluid border border-primary">

            <h1>Product Page</h1>

            {/* ===In a controlled way */}

            <div className="row">
                <div className="col order-first border border-danger rounded"> {/* "order-first" is located in first column: https://getbootstrap.com/docs/5.2/layout/columns/ */}

                    <section className={"componentClass"}>
                        <div className="form col-md-12">
                            <div className="col-md-12">
                                <b>Name </b>
                                <input type="text" className="form-control col-md-6"
                                    value={sProductName} //each keystroke of this will cause a rerender //state to update value.
                                    onChange={onTextChange} //passing a function as argument. 
                                    maxLength={20}
                                />
                            </div>
                            <div className="col-md-12">
                                <b>Price </b>
                                <input type="number" className="form-control col-md-6"
                                    value={sProductPrice} //each keystroke of this will cause a rerender
                                    onChange={(evt) => setProductPrice(evt.target.value)} //passing arrow function as argument directly. evt.preventDefault() is not needed here. 
                                //maxLength={6} //maxLength does NOT work with type="number"
                                />
                            </div>
                            <div className="col-md-12">
                                <b>Desc </b>
                                <input type="text" className="form-control col-md-6"
                                    value={sProductDesc} //each keystroke of this will cause a rerender
                                    onChange={(evt) => setProductDesc(evt.target.value)} //passing arrow function as argument directly. evt.preventDefault() is not needed here.  
                                    maxLength={40}
                                />
                            </div>
                            <div className="col-md-12">
                                <b>Rating </b>
                                <input type="number" className="form-control col-md-6"
                                    ref={rRating} //each keystroke of this will NOT cause a rerender //This line is done in an uncontrolled way by using ref keyword & useRef variable
                                //maxLength={2} //maxLength does NOT work with type="number"                            
                                />
                            </div>
                            <div style={{width: "60px"}}>
                                <input type="button" className="btn btn-primary"
                                    value={"Post"}
                                    onClick={postProduct}
                                />
                            </div>
                        </div>
                    </section>

                </div>
                <div className="col order-last border border-danger rounded"> {/* "order-last" is located in last column */}

                    <section className={"componentClass"}>
                        <div className="form col-md-12">
                            <div className="col-md-12">
                                {/* If your data is an array, you need to iterate over the array using .map() */}
                                {data.map((item) => {
                                    return (
                                        //Without key, there will be Warning: Each child in a list should have a unique "key" prop.
                                        <div key={item._id}>

                                            <b>Product: </b>
                                            {item.name} ${item.price} {item.name}     
                                            
                                            <input type="button" className="btn btn-primary" style={{ width: "100px" }}
                                                value={"Add to cart"}
                                                onClick={(event) => addProductToCart(event, item._id)} //passing the "event" and "_id" to handler "addProductToCart"
                                                
                                            />
                                            
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default ProductHookComponent;
