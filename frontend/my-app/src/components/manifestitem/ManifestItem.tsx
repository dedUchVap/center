import React from 'react';
import classes from './ManifestItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

interface ManifestItemProps {
  id: number;
  icon: string;
  title: string;
  describe: string;
  dataTime: string;
}

const ManifestItem: React.FC<ManifestItemProps> = ({
  id,
  dataTime,
  title,
  describe,
  icon,
}) => {
  return (
    <div className={classes.manifestitem}>
      <div className={classes.block1}>
        <FontAwesomeIcon
          className={classes.big_icon}
          icon={icon as any}
        ></FontAwesomeIcon>
      </div>
      <div className={classes.block2}>
        <h5 className={`color2 mb-3`}>{title}</h5>
        <div className={'d-flex flex-row mb-3'}>
          <FontAwesomeIcon
            className={`${classes.font_mb} color4`}
            icon={'clock'}
          ></FontAwesomeIcon>
          {dataTime}
        </div>
        <div className={'mb-2'}>{describe}</div>
        <span> </span>
      </div>
    </div>
  );
};

export default ManifestItem;
