import React, { useState } from 'react';
import Input from '../../components/formcomp/input';
import classes from './Login.module.css';
import FormLogin from '../../components/forms/formlogin/FormLogin';
import FormRegister from '../../components/forms/formregister/FormRegister';
import { useLocation } from 'react-router-dom';
import { IMessageNavigate } from '../../types/types';
import MessageNavigate from '../../components/Ui/MessageNavigate';

const Login = () => {
  const messageNavigate = useLocation();
  const state = messageNavigate.state as IMessageNavigate | null;

  interface FormState {
    form: 'login' | 'register';
    nameButton: 'Вход' | 'Регистрация';
  }

  const [form, setForm] = useState<FormState>({
    form: 'register',
    nameButton: 'Регистрация',
  });

  function changeForm() {
    if (form.form == 'login') {
      setForm({ form: 'register', nameButton: 'Регистрация' });
    } else {
      setForm({ form: 'login', nameButton: 'Вход' });
    }
  }

  return (
    <div className={classes.form_wrapper}>
      {state?.message ? (
        <MessageNavigate opacity={true}>{state.message}</MessageNavigate>
      ) : (
        ''
      )}
      <div className={classes.form_container}>
        <div className={classes.form}>
          <div className={classes.block1}>
            <div className={classes.login_button} onClick={changeForm}>
              {form.nameButton}
            </div>
            {form.form == 'login' ? (
              <FormLogin></FormLogin>
            ) : (
              <FormRegister></FormRegister>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
