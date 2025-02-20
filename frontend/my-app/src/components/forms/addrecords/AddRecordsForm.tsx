import React, { useEffect } from 'react';
import { IDataColumn } from '../../../types/types';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { DbApi } from '../../../api/loginapi/DbApi';
import { useParams } from 'react-router-dom';
import Selectsearch from '../../formcomp/selectsearch';
import SearchInput from '../../formcomp/Searchinput';

interface AddRecordsForm {
  data: IDataColumn[];
}

const AddRecordsForm: React.FC<AddRecordsForm> = ({ data }) => {
  const { table_name } = useParams();

  const [fetchObject, { data: dataResponse, error }] =
    DbApi.useFetchObjectMutation();

  function createUseState() {
    const keys = data.map((el) => Object.keys(el)[0]);
  }

  const { register, handleSubmit, control } = useForm<IDataColumn>();

  useEffect(() => {
    createUseState();
  }, []);
  return (
    <form
      className={'form_add'}
      onSubmit={handleSubmit((dataSubmit, event) => {
        const formData = new URLSearchParams();
        Object.entries(dataSubmit).forEach(([key, value]) => {
          formData.append(key, value as any);
        });
        fetchObject({ data: dataSubmit, tableName: table_name });
      })}
    >
      <h4>Добавление записи</h4>
      {data
        ? data.map((el, index) => {
            const values = Object.values(el)[0];
            let content = null;
            const key = Object.keys(el)[0];

            if (values.access == 'protect') {
              content = '';
              return content;
            }
            if (values.types == 'select' && values.select_option) {
              content = (
                <label className={'label_container'}>
                  <span>{key}</span>
                  <select {...register(key, { required: true })}>
                    {values.select_option.map((element_option, inx) => (
                      <option key={inx} value={element_option}>
                        {element_option.toString()}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            if (values.types == 'icon') {
              content = (
                <Controller
                  name={'iconname'}
                  control={control}
                  render={({ field }) => (
                    <Selectsearch
                      valueInputHookForm={field.value as any}
                      onBlurPropsHookForm={field.onBlur}
                      onChangePropsHookForm={field.onChange}
                      mode={'hook'}
                    ></Selectsearch>
                  )}
                ></Controller>
              );
            } else {
              content = (
                <label className={'label_container'}>
                  <span>{key}</span>
                  <input
                    {...register(key, { required: true })}
                    type={values?.types}
                  />
                </label>
              );
            }
            return content;
          })
        : ''}
      <Button type={'submit'}>Отправить</Button>
    </form>
  );
};

export default AddRecordsForm;
