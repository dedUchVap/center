import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";
import {useRedirect} from "../../hooks/Redirect";

const Logout = () => {
    const context = useContext(AuthContext)
    const navigate = useRedirect('/main', 'Ошибка Проверки Атворизации, пройдите авторизацию снова')
    function handleLogout() {
        localStorage.removeItem('access_token')
        navigate()
    }
    useEffect(() =>
    handleLogout(),
        [])

    return (
        <div>
           <div>Вы вышли</div>
        </div>
    );
};

export default Logout;