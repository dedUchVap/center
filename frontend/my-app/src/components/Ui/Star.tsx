import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";


interface IStarProps{
    value: number;
    setGrade: (value: number) => void
    classStar?: string
    setHoverValue?: (value: number) => void
}
const Star: React.FC<IStarProps> = ({value, setGrade, classStar, setHoverValue}) => {

    const [valueMy, setValue] = useState(value)
    function review(e: React.MouseEvent)  {
        e.preventDefault()
        setGrade(value)
    }

    function handlerMouseEnter(e: React.MouseEvent, valueFc=value) {
        if(typeof setHoverValue === 'function') {
            setHoverValue(valueFc)
            console.log('Навел')
        }
    }

    return (
        <div onMouseOver={(event) => handlerMouseEnter(event)} onClick={(event) => review(event)} className={classStar + ' star'} data-numberstar={value}>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
    );
};

export default Star;