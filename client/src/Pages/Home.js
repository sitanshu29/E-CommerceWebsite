import React from 'react'
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/Home/BestSellers';
import NewArrivals from '../components/Home/NewArrivals';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {


    return (
        <>

            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={["Latest Products", "New Arrivals", "Best Seller"]} />
            </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                New Arrivals
            </h4>

            <NewArrivals />


            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Best Sellers
            </h4>

            <BestSellers />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Categories
            </h4>

            <CategoryList />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                SubCategories
            </h4>

            <SubList />
        </>
    )
}

export default Home;