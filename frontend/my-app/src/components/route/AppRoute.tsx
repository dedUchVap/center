import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router/router';
import { AuthContext } from '../../context';
import { getToken } from '../../hooks/Token';

const AppRoute = () => {
  const locationMY = useLocation();
  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    setIsAuth(!!getToken());
  }, [locationMY]);
  return (
    <div className={'h-100'}>
      <Routes>
        {isAuth
          ? privateRoutes.map((route) => (
              <Route
                key={route.id}
                path={route.to}
                element={<route.component />}
              >
                {route?.nestedRoutes?.map((el) => (
                  <Route key={el.id} path={el.to} element={<el.component />} />
                ))}
              </Route>
            ))
          : publicRoutes.map((route) => (
              <Route
                key={route.id}
                path={route.to}
                element={<route.component />}
              ></Route>
            ))}
      </Routes>
    </div>
  );
};

export default AppRoute;
