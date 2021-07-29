import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CheckOut = () => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            console.log("user cart res", JSON.stringify(res.data, null, 4));

            setProducts(res.data.products);
            setTotal(res.data.cartTotal);

        })
    }, []);

    const saveAddressToDb = () => {
        saveUserAddress(user.token, address).then((res) => {
            // console.log(res);
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address Saved");

            }
        });
    }

    const emptyCart = () => {
        //remove from local Storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        //remove from redux state
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });

        //reomove from backend
        emptyUserCart(user.token).then((res) => {
            setProducts([]);
            setTotal(0);
            toast.success("Cart is empty. Continue Shopping");
        });

    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                <ReactQuill theme="snow" value={address} onChange={(value) => setAddress(value)} />
                <button className="btn btn-primary mt-2"
                    onClick={saveAddressToDb}>Save</button>
                <hr />
                <h4>Got Coupoun?</h4>
                <br />
                Coupoun Input and Apply
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p, i) => (
                    <div key={i}>
                        <p>
                            {p.product.title} ({p.color}) x {p.count} = {" "}
                            {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr />
                <p>Cart Total: ${total}</p>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">
                            Place Holder
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button disable={!products.length || !addressSaved}
                            onClick={emptyCart}
                            className="btn btn-primary">
                            Empty Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default CheckOut;