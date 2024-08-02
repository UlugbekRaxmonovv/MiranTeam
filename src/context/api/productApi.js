import { api } from './index'

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (params) => ({ 
        url: '/api/users/', 
        params 
      }),
      providesTags:["Product"]
    }),
    createProduct: build.mutation({
      query: (body)=> ({
        url:"/company/",
        method: "POST",
        body
      }),
      invalidatesTags: ["Product"]
    }),
    createProductAll: build.mutation({
      query: (body)=> ({
        url:"/api/users/",
        method: "POST",
        body
      }),
      invalidatesTags: ["Product"]
    }),
  }),
})

export const {
  useCreateProductMutation,
  useCreateProductAllMutation,
  useGetAdminsQuery,
} = productApi