import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createOrUpdateUser } from "../../functions/auth"




const Login = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        }
        else {
            if (user && user.token) {
                history.push("/");
            }
        }

    }, [user]);

    const dispatch = useDispatch();

    const roleBasedRedirect = (res) => {

        //check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        }
        else {
            if (res.data.role === "admin") {
                history.push("/admin/dashboard");
            }
            else {
                history.push("/user/history");
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdToken();
            console.log(idTokenResult);

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
                    roleBasedRedirect(res);
                })
                .catch(err => console.log(err));;

            //history.push("/");

        } catch (error) {
            toast.error(error.message);
        }

    };

    const LoginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)} placeholder="Your Email" />
            </div>

            <div className="form-group">
                <input type="password" className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="Your Password" />
            </div>

            <Button
                onClick={handleSubmit}
                type="primary"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
            >Login With Email and Password</Button>
        </form>
    )

    const googleLogin = async () => {

        try {
            const result = await auth.signInWithPopup(googleAuthProvider);
            const { user } = result;
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
                    roleBasedRedirect(res);
                })
                .catch(err => console.log(err));
            // history.push("/")

        } catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {LoginForm()}
                    <Button
                        onClick={googleLogin}
                        type="danger"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >Login With Google</Button>

                    <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
                </div>
            </div>

        </div>
    )
}

export default Login;