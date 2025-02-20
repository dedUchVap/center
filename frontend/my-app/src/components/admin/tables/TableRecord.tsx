import React, {useEffect, useState} from 'react';
import classes from "./Tables.module.css";
import Loading from "../../Ui/Loading";
import TableElement from "./TableElement";
import {Link, useParams} from "react-router-dom";
import {DbApi} from "../../../api/loginapi/DbApi";
import {TypeMappingTable} from "../../../types/types";


const TableRecord: React.FC = () => {
    const {table_name} = useParams()
    const {data, error, isLoading, isError} = DbApi.useFetchRecordsQuery({tableName: table_name as string})
    const [values, setValues] = useState<object[]>()
    const [keys, setKeys] = useState<any>()

    useEffect(() => {
        if (!error && data) {
            setValues(Object.values(data as any))
            if (Array.isArray(data)) {
                if (data.length) {
                    setKeys(Object.keys(data[0]))
                }
            }
        }
    }, [data, error]);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <div>Ошибка</div>
    }

    return (
        <div className={classes.table_records}>
            <table>
                <thead className={classes.head_table}>
                <tr>
                    {keys ? keys.map((el: string) => <th className={'col'}>{el.toString()}</th>) : ''}
                </tr>
                </thead>
                <tbody>
                {values ? values.map((el => <TableElement data={el}/>)) : ''}
                </tbody>
            </table>
            <Link to={`/admin/add_record/${table_name}`}><button className={'btn btn-secondary mt-3'}>Добавить запись</button></Link>
        </div>
    );
};

export default TableRecord;