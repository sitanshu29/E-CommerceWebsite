import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../../src/stripe.css"

const promise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

const Payment = () => {


    return (
        <div className="container p-5 text-center">
            <h4 >Complete Your Purchase</h4>
            <hr />
            <Elements stripe={promise}>
                <div className="col-md-7 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    );
}

export default Payment;