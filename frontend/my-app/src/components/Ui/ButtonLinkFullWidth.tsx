import React from 'react';
import classes from "./UI.module.css";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";


interface ButtonAdminPanelProps {
    children: React.ReactNode;
    icon: IconDefinition

}

const ButtonLinkFullWidth: React.FC<ButtonAdminPanelProps> = ({children, icon}) => {
    return (
        <div className={classes.button_admin}>
            {children}
            <FontAwesomeIcon className={classes.icon} icon={icon}></FontAwesomeIcon>
        </div>
    );
};

export default ButtonLinkFullWidth;