import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendBaseUrl } from '../utils';


console.log("END point", backendBaseUrl)
// Define the API service
export const usersApi = createApi({
    reducerPath: 'usersApi', // The key to add to the Redux store
    baseQuery: fetchBaseQuery({ baseUrl: `${backendBaseUrl}/auth`, credentials: 'include', prepareHeaders: (headers) => {
        // Get the token from sessionStorage
        const token = sessionStorage.getItem("token");
  
        // If token exists, add it to the headers
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
  
        return headers;
      },
    }),
    // Ensures cookies are sent with each request
    endpoints: (builder) => ({
        getSingleUser: builder.query({
            query: (id: string) => `/${id}`,
        }),

        getSingleUserById: builder.query({
            query: (id: string) => `/${id}`,
        }),
        getAlllUsers: builder.query({
            query: () => "/users"
        }),
        updateUser: builder.mutation({
            query: ({ userId, formData }) => ({
                url: `/update/${userId}`,
                method: "PUT",
                body: formData
            })
        }),
        deleteAccount: builder.mutation({
            query: (userId: string) => ({
                url: `/delete/${userId}`,
                method: "DELETE"
            })
        })
    }),
});

// Export the auto-generated hooks for queries and mutations
export const {
    useGetSingleUserQuery,
    useGetSingleUserByIdQuery,
    useGetAlllUsersQuery,
    useDeleteAccountMutation,
   useUpdateUserMutation,
} = usersApi;
