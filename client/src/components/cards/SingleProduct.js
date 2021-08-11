import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import laptop from "../../images/laptop.jpg"
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {

    const { title, images, description, _id } = product;

    const [tooltip, setTooltip] = useState("Add to Cart");

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    //router
    let history = useHistory();
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

    //wishlist
    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
            console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to Wishlist");
            history.push("/user/wishlist");
        })
    }


    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>) :
                    (
                        <Card cover={<img src={laptop} className="mb-3 card-image" />}></Card>
                    )
                }

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us on xxxx xxxx xxxx for more information of the Product.
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">
                    {title}
                </h1>

                {product && product.ratings && product.ratings.length > 0 ?
                    showAverage(product) : "No ratings Yet"
                }

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" />
                                <br /> Add Product to Cart
                            </a>
                        </Tooltip>,
                        <>
                            <a onClick={handleAddToWishlist}>
                                <HeartOutlined className="text-info" /> <br />
                                Add to WishList
                            </a>
                        </>,
                        <RatingModal>
                            <StarRating name={_id} numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
}

export default SingleProduct;