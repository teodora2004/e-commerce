import { apiSlice } from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: "POST",
        }),
      }),
  }),
});

// hook
export const { useLoginMutation, useLogoutMutation } = userApiSlice;
