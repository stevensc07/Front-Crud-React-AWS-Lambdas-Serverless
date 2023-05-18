import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import CompanyComponent from '../components/Company';
import Inventory from '../components/Inventory';
import AppContext from '../context/AppContext';

function Router() {
    const { islogged } = React.useContext(AppContext)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={ islogged ?  (<Navigate to="/home"/>):  <Login />} />
                <Route path="home" element={ islogged ?  <Home />  : (<Navigate to="/"/>)}  >
                    <Route index element={<CompanyComponent />} />
                    <Route path="" element={<CompanyComponent />} />
                    <Route path="inventory" element={<Inventory />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;