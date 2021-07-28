import React from "react";

const CheckOut = () => {

    const saveAddressToDb = () => {

    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                <input type="text" name="" id="" />
                <button className="btn btn-primary mt-2"
                    onClick={saveAddressToDb}>Save</button>
                <h4>Got Coupoun?</h4>
                <br />
                <input type="text" placeholder="Copoun Input" />
                <button>Apply</button>
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products X</p>
                <hr />
                <p>List of Products</p>
                <hr />
                <p>Cart Total: $x</p>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">
                            Place Holder
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button className="btn btn-primary">
                            Empty Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default CheckOut;