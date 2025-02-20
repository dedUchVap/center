import React from 'react';
import classes from "../nav/Nav.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

interface LinkButtonProps {
    icon: IconDefinition
    children: React.ReactNode
}

const LinkButton: React.FC<LinkButtonProps> = ({icon, children}) => {
    return (
        <div className={classes.link_div}>
            <FontAwesomeIcon className={classes.icon} icon={icon}></FontAwesomeIcon>
            {children}
        </div>
    );
};

export default LinkButton;