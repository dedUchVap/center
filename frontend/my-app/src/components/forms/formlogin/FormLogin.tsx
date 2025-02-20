import React, {FormEvent, useState} from 'react';
import classes from "../../../pages/Login/Login.module.css";
import Input from "../../formcomp/input";
import {LoginApi} from "../../../api/loginapi/LoginApi";
import Loading from "../../Ui/Loading";
import {useRedirect} from "../../../hooks/Redirect";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarsList from "../../Ui/StarsList";

const FormLogin = () => {

    const redirect_main = useRedirect('/main')


    const [login, {isLoading, error, isSuccess, isError}] = LoginApi.useFetchFormLoginMutation()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new URLSearchParams()


        formData.append('username', username)
        formData.append('password', password)
        try {
            const response = await login(formData).unwrap()
            localStorage.setItem('access_token', response.access_token)
        } catch (err) {
            console.log(err)
        }
    }
      if (isSuccess) {
            redirect_main()
        }

    return (
        <form onSubmit={handlerSubmit}
              className={`${classes.form_opacity} p-4 d-flex flex-column gap-3 justify-content-center`} method={'post'}>
            {isSuccess ? <div className={'text-success'}>Вы успешно вошли</div> : ''}
            {isError && <ErrorMessage error={error}/>}
            <Input required={true} handlerValue={setUsername} value={username} placeholder={'Логин'}></Input>
            <Input required={true} handlerValue={setPassword} value={password} placeholder={'Пароль'}></Input>
            <StarsList classHover={'star_default_hover'} classDefault={'star_default'} classSelect={'color_orange'} lenStars={5}></StarsList>
            {isLoading ? <Loading></Loading> : <button type={'submit'} className={'btn btn-success'}>Вход</button>}
        </form>
    );
};

export default FormLogin;