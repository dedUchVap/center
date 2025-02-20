import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import {testApi} from "../api/testapi/test";
import {LoginApi} from "../api/loginapi/LoginApi";
import {DbApi} from "../api/loginapi/DbApi";

export const store = configureStore(
    {
        reducer: {
            [testApi.reducerPath]: testApi.reducer,
            [LoginApi.reducerPath]: LoginApi.reducer,
            [DbApi.reducerPath]: DbApi.reducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(testApi.middleware).concat(LoginApi.middleware).concat(DbApi.middleware)
    }
)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch