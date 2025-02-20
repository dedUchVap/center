import React from 'react';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface CardAdvantagesProps{
    children?: React.ReactNode
    icon? : IconDefinition
}
const CardAdvantages: React.FC<CardAdvantagesProps> = ({children, icon}) => {
    return (
        <div className={'div_advantages box_shadow_1 text-start'}>
            {icon ? <FontAwesomeIcon className={'mt-0 mx-1 icon_24 color4'} icon={icon}></FontAwesomeIcon> :''}
            <span>{children}</span>
        </div>
    );
};

export default CardAdvantages;