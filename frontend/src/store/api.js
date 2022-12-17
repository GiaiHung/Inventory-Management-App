import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/client/products',
      providesTags: ['Products'],
    }),
  }),
})

export const { useGetProductsQuery } = api
