import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { createOrUpdateUser } from "../../functions/auth"


const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user } = useSelector(state => ({ ...state }));

    let dispatch = useDispatch();

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user]);

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegsitration"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if (!email || !password || password.length < 6) {
            toast.error("Email and Password Required and Passowrd must be gretaer than 6");
            return;
        }

        try {

            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log("Result", result);

            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration");

                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdToken();

                createOrUpdateUser(idTokenResult)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult,
                                role: res.data.role,
                                _id: res.data._id,
                            }
                        })
                    })
                    .catch(err => console.log(err));
                history.push("/");

            }

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }

    };

    const completeRegisterationForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
                value={email}
                disabled />


            <input type="password" className="form-control"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" />
            <br />
            <button type="submit" className="btn btn-raised">Complete Registeration</button>
        </form>
    )


    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegisterationForm()}

                </div>
            </div>

        </div>
    )
}

export default RegisterComplete;