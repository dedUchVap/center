import React from 'react';
import ManifestList from '../../components/manifestlist/ManifestList';
import { LoginApi } from '../../api/loginapi/LoginApi';

const Manifest = () => {
  const [func, {}] = LoginApi.useFetchbimMutation();
  return (
    <div className={'mt-5'}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <ManifestList></ManifestList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manifest;
