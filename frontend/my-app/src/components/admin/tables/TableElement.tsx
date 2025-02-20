import React from 'react';
import classes from "./Tables.module.css";
import {Link} from "react-router-dom";

interface ITableElement {
    data: object
}

const TableElement: React.FC<ITableElement> = ({data}) => {
    const values = Object.values(data)
    return (
        <tr>
            {values.map((el) =>  <td>{el?.toString() || 'Null'}</td>)}
        </tr>

    );
};

export default TableElement;