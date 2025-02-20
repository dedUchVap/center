import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import classes from './Formcomp.module.css';
import SearchInput from './Searchinput';
import SearchListIcon from '../Ui/SearchListIcon';
import { Noop } from 'react-hook-form';

library.add(fas);

interface BaseSelectProps {
  mode: 'hook' | 'default';
  validateFunc?: (value: any) => string[];
  list?: string[];
}

interface SelectSearchProps extends BaseSelectProps {
  mode: 'default';
}

interface SelectSearchPropsHookForm extends BaseSelectProps {
  mode: 'hook';
  valueInputHookForm: string;
  onBlurPropsHookForm: Noop;
  onChangePropsHookForm: (...event: any[]) => void;
}

type Select = SelectSearchProps | SelectSearchPropsHookForm;

const SelectSearch: React.FC<Select> = (props) => {
  const [listElementChange, setListElementChange] = useState<any[]>();
  const [listElementConst, setListElementConst] = useState<string[]>();
  const [valueInputSearch, setValueInput] = useState<string>('');
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  function handlerClick(value: any) {
    if (props.mode == 'hook') {
      props.onChangePropsHookForm(value);
    }
  }

  function handlerChange(value: string) {
    if (props.mode == 'hook') {
      props.onChangePropsHookForm(value);
    }
    setValueInput(value);
    setListElementChange(
      listElementConst?.filter((el) =>
        el.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  useEffect(() => {
    if (typeof props.validateFunc == 'function') {
      setListElementChange(props.validateFunc(props.list));
    }
    setListElementConst(Object.values(fas).map((el) => el.iconName));
  }, []);

  return (
    <div className={classes.select_search}>
      {props.mode == 'hook' ? (
        <SearchInput
          valueInput={props.valueInputHookForm}
          onBlumProps={setSearchVisible}
          onChangeProps={handlerChange}
          onFocusProps={setSearchVisible}
        ></SearchInput>
      ) : (
        <SearchInput
          valueInput={valueInputSearch}
          onBlumProps={setSearchVisible}
          onChangeProps={handlerChange}
          onFocusProps={setSearchVisible}
        ></SearchInput>
      )}

      <div>
        {props.mode == 'hook' ? (
          <SearchListIcon
            isVisibleProps={searchVisible}
            listProps={listElementChange as string[]}
            onClickProps={handlerClick}
          ></SearchListIcon>
        ) : (
          <SearchListIcon
            isVisibleProps={searchVisible}
            listProps={listElementChange as string[]}
            onClickProps={setValueInput}
          ></SearchListIcon>
        )}
      </div>
    </div>
  );
};
export default SelectSearch;
