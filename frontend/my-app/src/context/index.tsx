import {Context, createContext, useContext} from "react";

export const AuthContext = createContext<any>(!!localStorage.getItem('access_token'))