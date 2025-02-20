import {useNavigate} from "react-router-dom";
import {IMessageNavigate} from "../types/types";


export const useRedirect = (page: string, message: string = '') => {
    const navigate = useNavigate()
    return () => {
        navigate(page, {state: {message: message}})
    }
}