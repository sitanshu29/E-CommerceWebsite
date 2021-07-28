import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { createCategory, getCategories, removeCategory } from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
const CategoryCreate = () => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState("");
    const { user } = useSelector(state => ({ ...state }));
    const [categories, setCategories] = useState([]);
    const [keyWord, setKeyWord] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createCategory({ name }, user.token)
            .then(res => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" has been created`);
                loadCategories();
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Confirm Delete?")) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} is Deleted.`);
                    loadCategories();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }

                });
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />

                    <LocalSearch keyWord={keyWord} setKeyWord={setKeyWord} />

                    <br />
                    {categories.filter(searched(keyWord)).map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>{" "}
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-danger" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default CategoryCreate;