import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendBaseUrl } from '../utils';


console.log("END point", backendBaseUrl)
// Define the API service
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi', // The key to add to the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: `https://discuss-2jf5.onrender.com/auth`, credentials: 'include', }),
  // Ensures cookies are sent with each request
  endpoints: (builder) => ({

    // Define an endpoint to create a new post (POST request)
    signUp: builder.mutation({
      query: (user) => ({
        url: `/signup`,
        method: 'POST',
        body: user, // The new post data will be sent in the request body
      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: `/login`,
        method: 'POST',
        body: user, // The new post data will be sent in the request body
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST"
      })
    })

  }),
});

// Export the auto-generated hooks for queries and mutations
export const {
  useSignUpMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userAuthApi;
