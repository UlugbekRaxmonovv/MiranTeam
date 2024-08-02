import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => ({
        url: "/api/login/",
        method: "POST",
        body
      }),
      invalidatesTags: ["Admin"]
    }),
    getProfile: build.query({
      query: (params) => ({
        url: `/update/`,
        params
      }),
      providesTags: ["Admin"]
    }),
    getAdmin: build.query({
      query: (params) => ({
        url: '/api/accounts/',
        params
      }),
      providesTags: ["Admin"]
    }),
    getAdd: build.query({
      query: (params) => ({
          url: '/api/user-profile',
          params
      }),
      providesTags: ["Admin"]
  }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/admin/sign-up",
        method: "POST",
        body
      }),
      invalidatesTags: ["Admin"]
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useSignInMutation,
  useGetProfileQuery,
  useGetAddQuery,
  useGetAdminQuery,
} = userApi