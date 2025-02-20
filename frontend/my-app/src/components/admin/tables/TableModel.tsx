import React from 'react';
import classes from './Tables.module.css';
import { Link } from 'react-router-dom';

interface TableModelProps {
  lenRecords: number;
  nameTable: string;
}

const TableModel: React.FC<TableModelProps> = ({ nameTable, lenRecords }) => {
  return (
    <div className={classes.table_element}>
      <Link key={nameTable} to={`tables/${nameTable}`}>
        {nameTable}
      </Link>
      <span>{lenRecords}</span>
    </div>
  );
};

export default TableModel;
