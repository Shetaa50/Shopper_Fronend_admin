import React from "react";
import './Admin.css'
import Sidebar from "../../components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Addproducts from "../../components/Addproducts/Addproducts";
import Listproducts from "../../components/Listproducts/Listproducts";
import ListOrders from "../../components/ListOrders/ListOrders";
const Admin = () => {
    return (
        <div className="admin">
            <Sidebar/>

            <Routes>
                <Route path='/addproduct' element = {<Addproducts/>}/>
                <Route path='/Listproduct' element = {<Listproducts/>}/>
                <Route path='/ListOrders' element = {<ListOrders/>}/>
            </Routes>
        </div>
    );
};
export default Admin;