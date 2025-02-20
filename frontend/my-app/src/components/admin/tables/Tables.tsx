import React from 'react';
import classes from './Tables.module.css';
import { DbApi } from '../../../api/loginapi/DbApi';
import Loading from '../../Ui/Loading';
import TableElement from './TableElement';
import TableModel from './TableModel';

const Tables = () => {
  const { data, isLoading, isError, error } = DbApi.useFetchNamesTableQuery('');
  return (
    <div className={'w-75'}>
      <div className={classes.tables_admin}>
        <div className={classes.headers_table}>
          <span>Имя таблицы</span>
          <span>Количество записей</span>
        </div>
        <div className={classes.body_table}>
          {isLoading ? (
            <Loading></Loading>
          ) : isError ? (
            <div></div>
          ) : (
            data?.map((element) => (
              <TableModel
                key={element.nameTable}
                lenRecords={element.lenRecords}
                nameTable={element.nameTable}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tables;
