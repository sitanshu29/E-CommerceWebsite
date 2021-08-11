import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { createProduct } from "../../../functions/product";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getProduct, updateProduct } from "../../../functions/product";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Red", "Black", "Yellow", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Others"],
    color: "",
    brand: "",
}

const ProductUpdate = ({ match, history }) => {

    //redux
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [arrayOfSubs, setArrayOfSubIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(match.params.slug)
            .then((p) => {
                setValues({ ...values, ...p.data });

                getCategorySubs(p.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data);
                    });

                let arr = [];
                p.data.subs.map((s) => {
                    arr.push(s._id);
                });
                setArrayOfSubIds((prev) => arr);
            });


    }

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;

        updateProduct(match.params.slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.title} is Updated`);
                history.push("/admin/products")
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });

    }

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
        });

        if (values.category._id === e.target.value) {
            loadProduct();
        }

        setArrayOfSubIds([]);
        // setShowSub(true);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Product Update</h4>}
                    <hr />
                    {/* {JSON.stringify(values)} */}


                    <FileUpload values={values} setValues={setValues} setLoading={setLoading} />

                    <ProductUpdateForm handleSubmit={handleSubmit}
                        handleChange={handleChange} values={values}
                        setValues={setValues} handleCategoryChange={handleCategoryChange}
                        categories={categories} subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs} setArrayOfSubIds={setArrayOfSubIds}
                    />

                </div>

            </div>
        </div>
    )
}

export default ProductUpdate;


