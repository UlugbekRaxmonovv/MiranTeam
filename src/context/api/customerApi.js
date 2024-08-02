import { api } from './index'

export const customerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                url: '/update/?status=deactive',
                params
            }),
            providesTags: ["Customer"]
        }),
        getCompany: build.query({
            query: (params) => ({
                url: '/company/',
                params
            }),
            providesTags: ["Customer"]
        }),
        getCompanyCategory: build.query({
            query: (params) => ({
                url: '/update-company-list/',
                params
            }),
            providesTags: ["Customer"]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetProductQuery,
    useGetCompanyQuery,
    useGetCompanyCategoryQuery,
} = customerApi