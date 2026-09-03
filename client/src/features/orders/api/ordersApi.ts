import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import type {
    CreateOrderRequest,
    CreateOrderResponse,
} from '../types/order.types';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api',
    }),

    endpoints: (builder) => ({
        createOrder: builder.mutation<
            CreateOrderResponse,
            CreateOrderRequest
        >({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
} = ordersApi;