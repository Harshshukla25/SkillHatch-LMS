// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// // const COURSE_PURCHASE_API="http://localhost:6060/purchase";
// const COURSE_PURCHASE_API=`${import.meta.env.VITE_API_BASE_URL}/purchase`;

// export const purchaseApi= createApi({
//     reducerPath:"purchaseApi",
//     baseQuery:fetchBaseQuery({
//         baseUrl:COURSE_PURCHASE_API,
//         credentials:'include'
//     }),
//     endpoints:(builder)=>({
//         createCheckoutSession: builder.mutation({
//             query:(courseId)=>({
//                 url:"/checkout/create-checkout-session",
//                 method:"POST",
//                 body:{courseId}
//             })
//         }),
//         getCourseDetailWithStatus: builder.query({
//             query:(courseId)=>({
//                 url:`/course/${courseId}/detail-with-status`,
//                 method:"GET"
//             })
//         }),
//         getPurchasedCourse: builder.query({
//             query:()=>({
//                 url:`/`,
//                 method:"GET"
//             })
//         }),
//     })
// })

// export const {useCreateCheckoutSessionMutation,useGetCourseDetailWithStatusQuery,useGetPurchasedCourseQuery} = purchaseApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = `${import.meta.env.VITE_API_BASE_URL}/purchase`;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourse: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCourseQuery,
} = purchaseApi;
