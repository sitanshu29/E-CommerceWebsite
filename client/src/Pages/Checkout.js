import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CheckOut = ({ history }) => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState("");

    //discout price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState("");

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            console.log("user cart res", JSON.stringify(res.data, null, 4));

            setProducts(res.data.products);
            setTotal(res.data.cartTotal);

        });
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
            setTotalAfterDiscount(0);
            setCoupon("");
            toast.success("Cart is empty. Continue Shopping");
        });

    }

    const applyDiscountCoupon = () => {
        console.log("send coupn to backen", coupon);
        applyCoupon(user.token, coupon).then((res) => {
            console.log("RES ON CPN APPLIED", res.data);

            if (res.data) {
                setTotalAfterDiscount(res.data);
                //update redux coupon applied
                console.log("dispatching coupon true");
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true,
                });

            }
            if (res.data.err) {
                setDiscountError(res.data.err);
                //update redux coupon applied
                console.log("dispatching coupon false");
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                });
            }
        })
    }

    const showAppylCoupon = () => (
        <>
            <input type="text" value={coupon} className="form-control"
                onChange={e => {
                    setCoupon(e.target.value)
                    setDiscountError("");
                }
                }
            />
            <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
        </>
    )


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
                {showAppylCoupon()}
                <br />
                {discountError && <p className="bg-danger p-2">{discountError}</p>}
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
                {totalAfterDiscount > 0 && (
                    <p className="bg-success p-2">Discount Applied: Total Payable: {totalAfterDiscount}</p>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <button
                            className="btn btn-primary"
                            disabled={!addressSaved || !products.length}
                            onClick={() => history.push("/payment")}
                        >
                            Place Order
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button
                            disabled={!products.length}
                            onClick={emptyCart}
                            className="btn btn-primary"
                        >
                            Empty Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default CheckOut;