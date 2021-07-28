import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";


const AdminDashboard = () => {



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">
                    <h2>Admin Dashboard</h2>
                </div>
            </div>
        </div>
    );
}


export default AdminDashboard;