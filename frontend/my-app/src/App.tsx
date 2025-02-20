import React, {useState} from 'react';
import './App.css';
import Bar from "./components/bar/Bar";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context";
import Manifest from "./pages/Manifest/Manifest";
import AppRoute from "./components/route/AppRoute";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./app/store";
import {testApi, useGetTestStringQuery} from "./api/testapi/test";

function App() {
    const [isAuth, setIsAuth] = useState()
    const dispatch: AppDispatch = useDispatch()
    const {data} = useGetTestStringQuery()
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContext.Provider value={{setIsAuth, isAuth}}>
                    <Bar></Bar>
                </AuthContext.Provider>
                <AppRoute></AppRoute>
            </BrowserRouter>
        </div>
    );
}

export default App;
