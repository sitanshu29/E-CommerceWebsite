import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Home from './Pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './Pages/auth/RegisterComplete';
import ForgotPassword from './Pages/auth/ForgotPassword';
import History from './Pages/user/History';
import Password from './Pages/user/Password';
import Wishlist from './Pages/user/Wishlist';

import CategoryCreate from './Pages/Admin/category/CategoryCreate';
import CategoryUpdate from './Pages/Admin/category/CategoryUpdate';
import SubCreate from './Pages/Admin/Sub/SubCreate';
import SubUpdate from './Pages/Admin/Sub/SubUpdate';
import ProductCreate from './Pages/Admin/product/ProductCreate';
import UserRoute from './components/route/UserRoute';
import AdminRoute from './components/route/AdminRoute';
import { auth } from './firebase'
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth"
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AllProducts from './Pages/Admin/product/AllProducts';
import ProductUpdate from './Pages/Admin/product/ProductUpdate';
import Product from "./Pages/Product";
import CategoryHome from './Pages/Category/CategoryHome';
import SubHome from './Pages/Sub/SubHome';
import Cart from "./Pages/Cart";
import CheckOut from './Pages/Checkout';
import CreateCouponPage from './Pages/Admin/Coupon/CreateCouponPage';
import Payment from './Pages/Payment';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {
        const idTokenResult = await user.getIdToken();

        currentUser(idTokenResult)
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
      }

    })

    //cleanup
    return () => unsubscribe();

  }, []);

  return (

    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />

        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/cart" component={Cart} />

        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/checkout" component={CheckOut} />

        <Route exact path="/payment" component={Payment} />
      </Switch>

    </>
  )
}

export default App;
