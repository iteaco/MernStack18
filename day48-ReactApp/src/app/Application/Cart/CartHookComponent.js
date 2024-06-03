import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InsertProductToUserDB } from "../../../state/User/userAction";

//===Functional Component with Hooks:

const CartHookComponent = (props) => {
    //debugger;

    //==========================
    //===In a controlled way:
    //==========================

    //subscribe and read by using useSelector
    //NOTE: This variable type must NOT be "const" because it needs to be changed.
    let user = useSelector((store) => store.userReducer.user);
    
    //NOTE: This variable type must NOT be "const" because it needs to be changed.
    let [data, setData] = useState([]); //[] as an empty array 

    useEffect(() => {

        console.log("products", user, user.products)

        fetch("http://localhost:9000/product/api/getByIds",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user.products)
            })
            .then((response) => response.json())
            .then((apiData) => {
                //console.log("apidat", apiData);
                setData(apiData);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []); //componentDidMount
      
    //useDispatch() returns the dispatch function from the Redux store. //this makes the component as publisher for the data back to store, which is to dispatch an action.

    const dispatchStore = useDispatch();

    //To call a function on click event, use either the addEventListener() method or the onClick event attribute.
    //The following function will be called using the onClick event attribute (scroll down to the render() method to see it)

    const postCart = (evt) => {
        const userInfo =
        {
            ...user, //...user is to extract all fields of user
            products: user.products //assign user.products to field "products". Field "products" can be a existing field or a new field.
        }

        //to dispatch the action "SaveProductToDB", which is in productAction.js, to store. 
        //Store delivers to ALL reducers (reducers are configured in store.js). 
        //Reducers, based on the switch case actionTypes to determine if this data belongs to them, should respond with new state to store, if no state change, return existing state as it is.

        console.log("userInfo in CartHookComponent.js", userInfo);
        dispatchStore(InsertProductToUserDB(userInfo));

        evt.preventDefault();
    }
    
    //==========================
    //==========================
    //==========================

    return (
        <div className="container-fluid border border-primary">

            <h1>Cart Page</h1>

            {/* ===In a controlled way */}

            <div className="row">
                <div className="col order-first border border-danger rounded"> {/* "order-first" is located in first column: https://getbootstrap.com/docs/5.2/layout/columns/ */}

                    <section className={"componentClass"}>
                        <div className="form col-md-12">
                            <div style={{width: "60px"}}>
                                <input type="button" className="btn btn-primary"
                                    value={"Post"}
                                    onClick={postCart}
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

export default CartHookComponent;
