import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { createProduct } from "../../../functions/product";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Red", "Black", "Yellow", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
}

const ProductCreate = () => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((c) => setValues({ ...values, categories: c.data }));
    }

    //redux
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                console.log(res);
                toast.success(`"${res.data.title}" has been created`);
                setValues(initialState);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.err);
            })
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setValues({ ...values, subs: [], [e.target.name]: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            console.log(res.data);
            setSubOptions(res.data);
        })
        setShowSub(true);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Product Create</h4>}
                    {/* {JSON.stringify(values.images)}; */}

                    <hr />


                    <FileUpload values={values} setValues={setValues} setLoading={setLoading} />

                    <ProductCreateForm handleSubmit={handleSubmit}
                        handleChange={handleChange} values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions} showSub={showSub}
                        setValues={setValues} />

                </div>

            </div>
        </div>
    )
}

export default ProductCreate;


