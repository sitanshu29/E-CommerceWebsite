import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg"
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {

    const [tooltip, setTooltip] = useState("Add to Cart");

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleAddToCart = () => {

        //create cart
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));

            }
            //push new Product to cart
            cart.push({
                ...product,
                count: 1,
            });

            //remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem("cart", JSON.stringify(unique));
            setTooltip("Added");

            //add to redux store
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            })
        }
    }

    //destructure
    const { images, title, description, slug } = product;


    return (
        <>

            {product && product.ratings && product.ratings.length > 0 ?
                showAverage(product) : <div className="text-center">No ratings Yet</div>
            }

            <Card
                cover={
                    <img src={(images && images.length) ? images[0].url : laptop}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                    />

                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" />
                        <br /> View Product
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined className="text-danger" />
                            <br /> Add Product to Cart
                        </a>
                    </Tooltip>

                ]}
            >
                <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </>
    )

}

export default ProductCard;