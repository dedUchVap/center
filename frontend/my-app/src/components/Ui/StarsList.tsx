import React, {useEffect, useMemo, useState} from 'react';
import Star from "./Star";


interface IStarsList {
    lenStars: number;
    classDefault?: string;
    classHover?: string
    classSelect?: string
}

const StarsList: React.FC<IStarsList> = ({lenStars, classHover = '', classSelect, classDefault = ''}) => {

    const [starArray, setStarArray] = useState<any[]>([])
    const [grade, setGrade] = useState(1)
    const [hoverGrade, setHoverGrade] = useState(1)

    useEffect(() => {
        let stars = []
        for (let i = 1; i <= lenStars; i++) {
            stars.push(i)
        }
        setStarArray(stars)
    }, [hoverGrade]);

    useMemo(() => {

    }, [hoverGrade, grade])
    return (
        <div onMouseOut={event => setHoverGrade( 1)} className={'d-flex flex-row gap-2 star_list'}>
            {starArray.map(star => star <= grade ?
                <Star setHoverValue={setHoverGrade} classStar={classSelect} setGrade={setGrade} value={star}
                      key={star}></Star> :
                <Star setHoverValue={setHoverGrade} classStar={star > hoverGrade ? classDefault : classHover} setGrade={setGrade}
                      value={star} key={star}></Star>)}
        </div>
    );
};

export default StarsList