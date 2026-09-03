import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category, Product } from '../types/catalog.types';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5016/api',
  }),

  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),

    getProducts: builder.query<Product[], number | undefined>({
      query: (categoryId) => ({
        url: '/products',
        params: categoryId ? { categoryId } : {},
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
} = catalogApi;