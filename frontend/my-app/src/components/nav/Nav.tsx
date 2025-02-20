import React from 'react';
import classes from './Nav.module.css'
import {data, NavLink} from "react-router-dom";
import {ILink} from "../../types/components/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LinkButton from "../Ui/LinkButton";
import ButtonLinkFullWidth from "../Ui/ButtonLinkFullWidth";

interface NavProps {
    links: ILink[]
    classesNav?: string
    typeButton?: typeof ButtonLinkFullWidth | typeof LinkButton
    handleClick?: (value: any) => void
    valueHandle?: any
}

const Nav: React.FC<NavProps> = ({links, classesNav, typeButton: Component = LinkButton, handleClick, valueHandle}) => {
    return (
            <nav className={classes.flex_nav + ' ' + classesNav}>
                {links.map(link => link.icon ?
                        <NavLink
                            onClick={(event) => {handleClick?.(valueHandle)}}
                            key={link.id}
                        className={classes.link}
                        to={link.to}>
                            <Component icon={link.icon}> {link.name}</Component>
                    </NavLink>
                    : <NavLink key={link.id}
                        className={classes.link}
                        to={link.to}>
                        {link.name}
                    </NavLink>)}
            </nav>
    );
};

export default Nav;