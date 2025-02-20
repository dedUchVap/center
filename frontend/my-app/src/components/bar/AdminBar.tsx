import React from 'react';
import classes from "./AdminBar.module.css";
import LinkButton from "../Ui/LinkButton";
import {faInfo, faTable} from "@fortawesome/free-solid-svg-icons";
import ButtonLinkFullWidth from "../Ui/ButtonLinkFullWidth";

const AdminBar = () => {
    return (
        <div className={classes.admin_panel}>
            <h4 className={classes.name_admin_panel + ' p-2'}>Навигация</h4>
            <div className={classes.admin_panel_navigate}>
                <ButtonLinkFullWidth icon={faTable}>Таблицы</ButtonLinkFullWidth>
                <ButtonLinkFullWidth icon={faInfo}>Мероприятия</ButtonLinkFullWidth>
            </div>
        </div>
    );
};

export default AdminBar;