import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {

    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSub(match.params.slug).then((c) => {
            console.log(JSON.stringify(c.data, null, 4));
            setSub(c.data.sub);
            setProducts(c.data.products);
            setLoading(false);
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                            Loading...
                        </h4>
                    ) : (
                        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                            {products.length} Products in "{sub.name}" SubCategory
                        </h4>
                    )}
                </div>
            </div>

            <div className="row">
                {products.map((p) => (
                    <div className="col-md-4" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubHome;