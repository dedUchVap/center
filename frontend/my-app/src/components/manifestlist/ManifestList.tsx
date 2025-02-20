import React, { useEffect, useState } from 'react';
import classes from './ManifestList.module.css';
import ManifestItem from '../manifestitem/ManifestItem';
import { DbApi } from '../../api/loginapi/DbApi';
import Loading from '../Ui/Loading';
import { IEvents } from '../../types/types';

const ManifestList = () => {
  const { data, error, isLoading } = DbApi.useFetchRecordsQuery({
    tableName: 'events',
  });

  const [limit, setLimit] = useState();
  const [page, setPage] = useState();

  const [new_data, setNewData] = useState<IEvents[]>();

  useEffect(() => {
    if (data) {
      setNewData(data as any);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={'h-100 mb-3'}>
        <div className={classes.manifest_list}>
          <Loading></Loading>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={'h-100 mb-3'}>
        <div className={classes.manifest_list}>
          <h2>Произошла ошибка</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={'h-100 mb-3'}>
      <div className={classes.manifest_list}>
        <h2>Мероприятия</h2>
        {new_data
          ? new_data.map((el) => (
              <ManifestItem
                id={el.id}
                icon={el.iconname}
                title={el.title}
                describe={el.describe}
                dataTime={el.data.replace('T', ' ')}
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export default ManifestList;
