import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LoginApi } from '../../api/loginapi/LoginApi';
import { data } from 'react-router-dom';
import { useRedirect } from '../../hooks/Redirect';
import Loading from '../Ui/Loading';
import logout from '../logout/Logout';
import Logout from '../logout/Logout';

interface ICheckAuthProps {
  Component: React.FC;
}

interface IComponentsProps {
  someProps?: object;
}

function WithAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedComponent(props: P) {
    const isFirstRenderUpdate = useRef(true);
    const [redirect, setRedirect] = useState(false);
    const [
      updateToken,
      { data, isLoading: isLoadingUpdateToken, error: errorUpdateToken },
    ] = LoginApi.useLazyFetchUpdateTokenQuery();
    const [
      verifyToken,
      {
        error: errorVerifyToken,
        isError: isErrorVerifyToken,
        isLoading: isLoadingVerifyToken,
      },
    ] = LoginApi.useLazyFetchCheckAuthenticationQuery();
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
      if (isFirstRenderUpdate.current) {
        isFirstRenderUpdate.current = false;
        return;
      }
      if (errorUpdateToken) {
        setRedirect(true);
        return;
      }
      if (data?.access_token) {
        localStorage.setItem('access_token', data.access_token);
        setAuth(true);
      }
    }, [isLoadingUpdateToken]);

    useEffect(() => {
      if (isFirstRenderUpdate.current) {
        isFirstRenderUpdate.current = false;
        return;
      }
      if (errorVerifyToken) {
        updateToken('');
        return;
      }
      setAuth(true);
    }, [updateToken, isErrorVerifyToken, errorVerifyToken]);

    useEffect(() => {
      verifyToken('');
    }, []);

    if (isLoadingUpdateToken || isLoadingVerifyToken) {
      return <Loading></Loading>;
    }

    return (
      <>
        {isAuth ? (
          <WrappedComponent {...props}></WrappedComponent>
        ) : (
          <div
            className={
              'h-100 d-flex justify-content-center align-items-center text-danger'
            }
          >
            У вас недостаточно прав для просмотра этой страницы, пошли вон
          </div>
        )}
      </>
    );
  };
}

export default WithAuth;
