import React, {useContext, useEffect, useMemo, useState} from 'react';
import classes from './Bar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import Nav from "../nav/Nav";
import {AuthContext} from "../../context";
import {privateRoutes, publicRoutes} from "../../router/router";
import {useLocation} from "react-router-dom";
import {getToken} from "../../hooks/Token";
import {useWindowWidth} from "../../hooks/UseWindowWidth";
import ButtonLinkFullWidth from "../Ui/ButtonLinkFullWidth";
import MobileNavBar from "./MobileNavBar";


const Bar: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>()

    const locationMy = useLocation()

    useEffect(() =>{
        setIsAuth(!!getToken())
    }, [locationMy])

    const width = useWindowWidth()
    return (
        <div className={'position-relative'}>
        {width > 1034 ? <header>
                <div className='container'>
                    <div className='row'>
                        <div className={classes.bar}>
                            <div className={classes.icon_container}>
                                <FontAwesomeIcon className={classes.icon} icon={faPlay}></FontAwesomeIcon>
                                <span className={classes.icon_text}>КОМПЛЕКСЦЕНТР</span>
                            </div>
                            <Nav links={isAuth ? privateRoutes : publicRoutes}></Nav>
                        </div>
                    </div>
                </div>
        </header>:
            <MobileNavBar></MobileNavBar>
         }
        </div>
    );
};

export default Bar;