import {createSlice} from "@reduxjs/toolkit";


interface AuthSLiceState {
    auth: boolean
}

const initialState: AuthSLiceState = {
    auth: false
}

export const AuthSLice = createSlice(
    {
        initialState,
        name: 'AuthSlice',
        reducerPath: 'AuthSlice',
        reducers: {
            authSet: (state) => {
                state.auth = true
            },
            logout: (state) => {
                state.auth = false
            }

        }
    }
)