import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './LoginApi';
import {
  IDataColumn,
  IFetchRecords,
  IFetchResponseTableRecords,
  ITable,
} from '../../types/types';

export const DbApi = createApi({
  baseQuery: baseQueryWithToken,
  reducerPath: 'DbApi',
  endpoints: (build) => ({
    fetchNamesTable: build.query<ITable[], any>({
      query: (arg) => ({
        url: '/tables',
        credentials: 'include',
      }),
    }),
    fetchRecords: build.query<IFetchResponseTableRecords, IFetchRecords>({
      query: (arg) => ({
        url: `/tables/${arg.tableName}`,
        params: {
          limit: arg.limit ? arg.limit : 10,
          page: arg.page ? arg.page : 0,
        },
      }),
    }),
    fetchColumns: build.query<IDataColumn[], { tableName: string }>({
      query: (arg) => ({
        url: `add_record/${arg.tableName}`,
      }),
    }),
    fetchObject: build.mutation<any, any>({
      query: (arg) => ({
        url: `add_object/${arg?.tableName}`,
        body: JSON.stringify(arg?.data),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }),
    }),
  }),
});
