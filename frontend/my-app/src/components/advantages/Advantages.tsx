import React from 'react';
import CardAdvantages from "../card_advantages/CardAdvantages";
import {faFlask} from "@fortawesome/free-solid-svg-icons/faFlask";
import {faMusic} from "@fortawesome/free-solid-svg-icons/faMusic";
import {faFlag} from "@fortawesome/free-solid-svg-icons/faFlag";
import {faChildren} from "@fortawesome/free-solid-svg-icons/faChildren";

const Advantages = () => {
    return (
        <div>
            <section className={'section_advantages'}>
                <div className="container">
                    <div className="row">
                        <div className={'col-12 d-flex flex-row justify-content-center align-items-center'}>
                            <div className={'flex-row d-flex container_advantages w-100-mobile'}>
                                <div className={'w-100'}>
                                    <div className={'text-center fw-bold mb-3'}>На чем мы специализируемся?</div>
                                    <div className={'d-flex gap-3 flex-xl-row flex-column'}>
                                        <div
                                            className={'w-100 d-flex flex-column justify-content-center align-items-center'}>
                                            <div className="d-flex justify-content-center align-items-center mb-4 w-75">
                                                <CardAdvantages icon={faFlask}> - Научные конференции</CardAdvantages>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center mb-4 w-75">
                                                <CardAdvantages icon={faMusic}> - Музыкальная тематика</CardAdvantages>
                                            </div>
                                        </div>
                                        <div
                                            className={'w-100 d-flex flex-column justify-content-center align-items-center'}>
                                            <div className="d-flex justify-content-center align-items-center mb-4 w-75">
                                                <CardAdvantages icon={faFlag}> - История Страны</CardAdvantages>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center mb-4 w-75">
                                                <CardAdvantages icon={faChildren}> - Детские программы</CardAdvantages>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Advantages;