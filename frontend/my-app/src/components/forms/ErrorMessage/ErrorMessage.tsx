import React from 'react';
import {IError} from "../../../types/types";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {SerializedError} from "@reduxjs/toolkit";

interface ErrorMessageProps {
    error: IError | FetchBaseQueryError | SerializedError | undefined
}

type Error = SerializedError | FetchBaseQueryError | IError | undefined
const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {

    const arrayStatusFetched = ['FETCH_ERROR', 'PARSING_ERROR', 'TIMEOUT_ERROR', 'CUSTOM_ERROR']

    const IsIErro = (error: any): error is IError => {
        return error && typeof error === 'object' && 'data' in error && 'detail' in error.data
    }

    const FetchError = (error: any): error is FetchBaseQueryError => {
        return error && typeof error == 'object' && 's'
    }
    return (
        <div className={'text-danger'}>
        </div>
    );
};

export default ErrorMessage;