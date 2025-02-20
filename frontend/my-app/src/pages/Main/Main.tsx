import React, {useContext} from 'react';
import Advantages from "../../components/advantages/Advantages";
import Loading from "../../components/Ui/Loading";
import {AuthContext} from "../../context";

const Main = () => {
    return (
        <div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <h2 className={'mt-3'}>Найдите для себя способ провести время</h2>
                        <h4 className={'mt-4'}>Лучшие выставки каждый день</h4>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className={'img_container'}>
                            <img className={'img'} src="img/complecs.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <Advantages></Advantages>
        </div>
    );
};

export default Main;