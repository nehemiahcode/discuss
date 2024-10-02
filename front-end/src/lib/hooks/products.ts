import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendBaseUrl } from '../utils';

// Define the API service
export const productsApi = createApi({
  reducerPath: 'productsApi', // The key to add to the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: `${backendBaseUrl}/api/products`,
    prepareHeaders: (headers) => {
      // Get the token from sessionStorage
      const token = sessionStorage.getItem("token");

      // If token exists, add it to the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => `/`,
    }),
    getProductsById: builder.query({
      query: (id: string) => `/${id}`,
    }),
    createProduct: builder.mutation({
      query: (products) => ({
        url: `/`,
        method: 'POST',
        body: products,
      }),
    }),
    updateProducts: builder.mutation({
      query: (productId: string) => ({
        url: `/${productId}`,
        method: "PUT",
      }),
    }),
    deleteProductById: builder.mutation({
      query: (productId: string) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the auto-generated hooks for queries and mutations
export const {
  useGetAllProductQuery,
  useGetProductsByIdQuery,
  useCreateProductMutation,
  useUpdateProductsMutation,
  useDeleteProductByIdMutation,
} = productsApi;
