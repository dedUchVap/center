export interface Token {
  access_token: string;
  token_type: string;
}

export interface IError {
  data: { detail: string };
  status_code: number;
}
export interface ITable {
  nameTable: string;
  lenRecords: number;
}
export interface IFetchRecords {
  tableName: string;
  limit?: number;
  page?: number;
}
export interface IFetchResponseTableRecords {
  columns: string[];
  value: string[];
  typesColumns: string[];
}

export interface IUser {
  data_end_token: string;
  date_bird_token: string;
  auth: boolean;
  id: number;
  password: string;
  username: string;
  refresh_token: string;
  disable: boolean;
  roly: string;
}

export interface IEvents {
  data: string;
  id: number;
  title: string;
  describe: string;
  iconname: string;
}

export type TypeMappingTable = {
  user: IUser;
  events: IEvents;
};

export interface IMessageNavigate {
  message: string;
}

export interface IDataColumn {
  [key: string]: IColumnMetaData;
}
export interface IColumnMetaData {
  access: 'read' | 'write' | 'protect';
  types?: string;
  select_option?: string[];
}
