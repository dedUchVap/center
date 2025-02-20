import React from 'react';
import classes from "./UI.module.css";

interface MessageNavigateProps{
    opacity: boolean
    children: React.ReactNode
}

const MessageNavigate: React.FC<MessageNavigateProps> = ({opacity,children}) => {
    return (
        <div className={opacity ? classes.message + " " +  classes.message_active: classes.message}>
            <span>{children}</span>
        </div>
    );
};

export default MessageNavigate;