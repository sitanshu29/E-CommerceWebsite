import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg"
import { useDispatch } from "react-redux";
import { toSafeInteger } from "lodash";
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {

    const colors = ["Red", "Black", "Yellow", "White", "Blue"];
    const dispatch = useDispatch();

    const handleColorChange = (e) => {

        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart"))
                cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === p._id) {
                cart[i].color = e.target.value;
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        });
    };

    const handleQuantityChange = (e) => {
        if (e.target.value < 1)
            e.target.value = 1;
        if (e.target.value > p.quantity) {
            toast.error(`Max Available Quantity : ${p.quantity}`);
            return;
        }
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart"))
                cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === p._id) {
                cart[i].count = e.target.value;
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        });

    }

    const handleRemove = () => {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart"))
                cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === p._id) {
                cart.splice(i, 1);
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart
        });
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: '100px', height: 'auto' }}>
                        {p.images.length ?
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />
                            :
                            <ModalImage small={laptop} large={laptop} />
                        }
                    </div>
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange}
                        name="color" className="form-control">
                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}

                        {colors.filter((c) => c !== p.color).map((c) => (<option key={c} value={c}>
                            {c}
                        </option>))}

                    </select>
                </td>
                <td className="text-center">
                    <input type="number" className="form-control"
                        value={p.count} onChange={handleQuantityChange} />
                </td>
                <td className="text-center">
                    {p.shipping === "Yes" ? (
                        <CheckCircleOutlined className="text-success" />
                    ) : (
                        <CloseCircleOutlined className="text-danger" />
                    )}
                </td>
                <td className="text-center">
                    <CloseOutlined onClick={handleRemove} className="text-danger pointer" />
                </td>

            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout;