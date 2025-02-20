import React from 'react';
import AdminBar from "../../components/bar/AdminBar";
import classes from "./Admin.module.css";
import Tables from "../../components/admin/tables/Tables";
import {Outlet} from "react-router-dom";


const Admin = () => {
    return (
        <div className={classes.admin_main}>
            <AdminBar></AdminBar>
            <div className={'d-flex flex-column align-items-center justify-content-center w-100 gap-5 w100-max ' + classes.tables }>
            <div className={classes.container_hello_admin + " text-center mt-5 p-4"}>
                <h2 className={'mb-3'}>Вас приветствует панель администратора</h2>
                <span>Добро пожаловать в панель администратора! Управляйте содержимым, следите за данными и настройками — всё в одном месте. Удачной работы!</span>
            </div>
            <Outlet></Outlet>
            <Tables></Tables>
            </div>

        </div>

    );
};

export default Admin;