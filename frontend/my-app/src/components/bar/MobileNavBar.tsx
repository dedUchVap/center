import React, {useEffect, useState} from 'react';
import classes from "./Bar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faBurger, faBars} from "@fortawesome/free-solid-svg-icons";
import {publicRoutes, privateRoutes} from "../../router/router";
import Nav from '../nav/Nav'
import ButtonLinkFullWidth from "../Ui/ButtonLinkFullWidth";
import {getToken} from "../../hooks/Token";
import {useLocation} from "react-router-dom";


const MobileNavBar = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>()

    const locationMy = useLocation()

    function handlerCloseMenu(event: MouseEvent) {
        const target = event.target as HTMLDivElement
        if (menuOpen &&  !target.classList.contains('btn_menu')) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        setIsAuth(!!getToken())

        document.addEventListener('click', handlerCloseMenu)
        return () => document.removeEventListener('click', handlerCloseMenu)

    }, [menuOpen])


    function handlerClick() {
        setMenuOpen(!menuOpen)
    }

    return (
        <div>
            {menuOpen ? <div className={classes.mobile_bar}>
                    <div className={'d-flex flex-row justify-content-between'}><h3>Навигация</h3>
                        <button onClick={(event) => handlerClick()} className={'btn btn_menu'}><FontAwesomeIcon
                            className={'bg-transparent color4'} icon={faBars}></FontAwesomeIcon></button>
                    </div>
                    <Nav handleClick={setMenuOpen} valueHandle={false} typeButton={ButtonLinkFullWidth}
                         classesNav={'flex-column gap-1 justify-content-center'}
                         links={isAuth ? privateRoutes : publicRoutes}></Nav>
                </div> :
                <div className='container-fluid'>
                    <div className='row'>
                        <div className={classes.bar}>
                            <div className={classes.icon_container}>
                                <div><FontAwesomeIcon className={classes.icon} icon={faPlay}></FontAwesomeIcon></div>
                                <span className={classes.icon_text}>КОМПЛЕКСЦЕНТР</span>
                            </div>
                            <button onClick={(event) => handlerClick()} className={'btn btn_menu'}><FontAwesomeIcon
                                className={'bg-transparent color4'} icon={faBars}></FontAwesomeIcon></button>
                        </div>
                    </div>
                </div>}
        </div>

    );
};

export default MobileNavBar;