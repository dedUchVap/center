import React, {FormEvent, useState} from 'react';
import classes from "../../../pages/Login/Login.module.css"
import Input from "../../formcomp/input";
import {LoginApi} from "../../../api/loginapi/LoginApi";
import {useRedirect} from "../../../hooks/Redirect";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const FormRegister = () => {

    const redirectMain = useRedirect('/main')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [register, {isError, error, isLoading}] = LoginApi.useFetchFormRegisterMutation()

    async function handlerSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formData = new URLSearchParams()

        formData.append('username', username)
        formData.append('password', password)

        const response = await register(formData)

        if (isError) {
            redirectMain()
            return <div>Регистрация Прошла успешна, можете входить в аккаунт</div>
        }
    }
    return (
            <form onSubmit={handlerSubmit} className={`${classes.form_opacity} p-4 d-flex flex-column gap-3 justify-content-center`} method={'post'}>
                <Input required={true} handlerValue={setUsername} value={username} placeholder={'Логин'}></Input>
                <Input required={true} handlerValue={setPassword} value={password} placeholder={'Пароль'}></Input>
                <Input required={true} handlerValue={setPassword2} value={password2} placeholder={'Повторите пароль'}></Input>
                <button className={'btn btn-success'}>Регистрация</button>
            </form>
    );
};

export default FormRegister;