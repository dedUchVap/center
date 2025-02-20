import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import * as url from "node:url";
import {IFormLogin} from "../../types/formstypes/formsTypes";
import React from "react";
import {Token} from "../../types/types";
import {getToken} from "../../hooks/Token";


export const baseQueryWithToken = fetchBaseQuery({
    baseUrl: 'http://192.168.1.235:8005/', prepareHeaders: (headers) => {
        const token = getToken()
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})
export const LoginApi = createApi({
    tagTypes: ['authentication'],
    reducerPath: 'LoginApi',
    baseQuery: baseQueryWithToken,
    endpoints: (build) => ({
        fetchFormLogin: build.mutation<Token, URLSearchParams>({
            query: (credintials) => ({
                url: '/token',
                body: credintials.toString(),
                method: 'POST',
                headers: {"Content-Type": 'application/x-www-form-urlencoded'},
                credentials: 'include'
            })
        }),
        fetchFormRegister: build.mutation<any, any>({
            query: (credintials) => ({
                url: '/register',
                body: credintials.toString(),
                method: "POST",
                headers: {"Content-Type": 'application/x-www-form-urlencoded'},
                credentials: 'include'
            })
        }),
        fetchbim: build.mutation<any, any>({
            query: () => ({
                url: '/test2',
                credentials: 'include',
            })
        }),
        fetchCheckAuthentication: build.query<any, any>({
            query: () => ({
                url: '/verifytoken',
                credentials: 'include',
                headers: {'content-type': 'text/plain'}
            })
        }),
        fetchUpdateToken: build.query({
            query: () => ({
                url: '/updatetoken',
                credentials: 'include'
            })
        })
    })
})