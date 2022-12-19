import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['Products', 'Customers', 'Transactions', 'Geography'],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/client/products',
      providesTags: ['Products'],
    }),
    getCustomers: builder.query({
      query: () => '/client/customers',
      providesTags: ['Customers'],
    }),
    getTransactions: builder.query({
      query: ({ page, pageSize, search, sort }) => ({
        url: '/client/transactions',
        method: 'GET',
        params: { page, pageSize, search, sort },
      }),
      providesTags: ['Transactions'],
    }),
    getGeography: builder.query({
      query: () => '/client/geography',
      providesTags: ['Geography'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
} = api
