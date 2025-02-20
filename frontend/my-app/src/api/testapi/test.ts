import {
    BaseQueryFn, EndpointBuilder, EndpointDefinitions, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta,
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


export const testApi = createApi(
    {
        reducerPath: 'test',
        baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8005/'}),
        endpoints: (builder) => ({
            getTestString: builder.query<string, void>({
                query: () => ({
                    url: '/test'
                })
            })
        })
    }
)

export const {useGetTestStringQuery} = testApi