import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify';
import { useSelector } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';


const Register = ({ history }) => {

    const [email, setEmail] = useState("");

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };
        try {
            await auth.sendSignInLinkToEmail(email, config);


            //save user email in local storage
            window.localStorage.setItem('emailForRegsitration', email);
            toast.success(`Email sent to ${email}`);
            //clear Email
            setEmail("");
        }
        catch (error) {
            toast.error(error.message);
        }

    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)} placeholder="Your Email" />

            <br />
            <button type="submit" className="btn btn-raised">Register</button>
        </form>
    )


    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}

                </div>
            </div>

        </div>
    )
}

export default Register;