import React from 'react';
import {DbApi} from "../../../api/loginapi/DbApi";
import {useParams} from "react-router-dom";
import classes from "./AddRecords.module.css";
import Loading from "../../Ui/Loading";
import AddRecordsForm from "../../forms/addrecords/AddRecordsForm";
import Selectsearch from "../../formcomp/selectsearch";

const AddRecords = () => {

    const {table_name} = useParams()
    const {data, isLoading, error} = DbApi.useFetchColumnsQuery({tableName: table_name as string})

    if (isLoading) {
        return (
            <div className={classes.add_record}>
                <Loading></Loading>
            </div>)
    }

    if (error) {
        return (
            <div className={classes.add_record}>
                Произошла ошибка
            </div>)
    }

    return (
        <div className={classes.add_record}>
            {data ? <AddRecordsForm data={data}></AddRecordsForm> : ''}
        </div>
    );
};

export default AddRecords;