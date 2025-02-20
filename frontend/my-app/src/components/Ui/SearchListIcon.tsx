import React from 'react';
import classes from '../formcomp/Formcomp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchListIconProps {
  isVisibleProps: boolean;
  listProps: string[];
  onClickProps: (value: string) => void;
}

const SearchListIcon: React.FC<SearchListIconProps> = ({
  isVisibleProps,
  listProps,
  onClickProps,
}) => {
  return (
    <ul
      className={`${classes.search_result} ${classes.width_search} ${!isVisibleProps ? 'd-none' : null}`}
    >
      {listProps?.slice(0, 10).map((el) => (
        <li onClick={() => onClickProps(el)} className={classes.li_search}>
          <span className={classes.name_icon}>{el.toUpperCase()}</span>
          <FontAwesomeIcon icon={el as any}></FontAwesomeIcon>
        </li>
      ))}
    </ul>
  );
};

export default SearchListIcon;
