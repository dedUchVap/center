import React from 'react';
import classes from './Formcomp.module.css';
import { useForm, UseFormRegister } from 'react-hook-form';

interface SearchInputProps {
  valueInput: string;
  onBlumProps: (value: boolean) => void;
  onChangeProps: (value: string) => void;
  onFocusProps: (value: boolean) => void;
  classesProps?: string;
  label?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  valueInput,
  onChangeProps,
  onBlumProps,
  onFocusProps,
  classesProps,
  label = true,
}) => {
  return (
    <>
      {label ? (
        <label className={classes.label_input_search}>
          <input
            required={true}
            value={valueInput}
            placeholder={'Поиск...'}
            className={classes.input_search}
            onChange={(event) => onChangeProps(event.target.value)}
            onFocus={() => onFocusProps(true)}
            onBlur={() => setTimeout(() => onBlumProps(false), 100)}
          />
        </label>
      ) : (
        <input
          required={true}
          value={valueInput}
          className={classes.input_search}
          onChange={(event) => onChangeProps(event.target.value)}
          onFocus={() => onFocusProps(true)}
          onBlur={() => onBlumProps(false)}
        />
      )}
    </>
  );
};

export default SearchInput;
