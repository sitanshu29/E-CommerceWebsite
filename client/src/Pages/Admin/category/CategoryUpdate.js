import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";


const CategoryUpdate = ({ history, match }) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState("");
    const { user } = useSelector(state => ({ ...state }));


    useEffect(() => {

        loadCategory();
    }, []);

    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => setName(c.data.name));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateCategory(match.params.slug, { name }, user.token)
            .then(res => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" has been updated`);
                history.push("/admin/category");
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                toast.error(err.message);
            });
    }





    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update Category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
                    <br />

                </div>
            </div>
        </div>
    );
};


export default CategoryUpdate;