import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify"


const Password = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                toast.success("Password Updated");

            })
            .catch(err => {
                setLoading(false);
                toast.error(err.message);
            });

        setPassword("");
    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label >Your Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter new Password"
                value={password}
                disabled={loading}
            />

            <button type="submit"
                className="btn btn-primary"
                disabled={loading || password.length < 6}
            >
                Submit</button>
        </div>
    </form>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h3>Password Update</h3>}
                    {passwordUpdateForm()}</div>
            </div>
        </div>
    );
}

export default Password;