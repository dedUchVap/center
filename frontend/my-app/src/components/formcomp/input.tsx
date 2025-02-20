import React from 'react';
import classes from './Formcomp.module.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  handlerValue: (value: any) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  handlerValue,
  required,
}) => {
  return (
    <div>
      <input
        required={required}
        onChange={(event) => {
          handlerValue(event.target.value);
        }}
        value={value}
        placeholder={placeholder ? placeholder : ''}
        type={type ? type : 'text'}
        className={classes.input}
      />
    </div>
  );
};

export default Input;
