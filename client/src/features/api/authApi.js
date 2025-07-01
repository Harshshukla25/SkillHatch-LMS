// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn, userLoggedOut } from "../authSlice";

// const USER_API = `${import.meta.env.VITE_API_BASE_URL}/user/`;
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: USER_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (inputData) => ({
//         url: "signup",
//         method: "POST",
//         body: inputData,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (inputData) => ({
//         url: "login",
//         method: "POST",
//         body: inputData,
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user }));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//     logoutUser:builder.mutation({
//             query:()=>({
//                 url:"logout",
//                 method:"GET"
//             }),
//             async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           dispatch(userLoggedOut());
//         } catch (error) {
//           console.log(error);
//         }
//       },
            
//     }),
//     loadUser: builder.query({
//       query: () => ({
//         url: "profile",
//         method: "GET",
//       }),
//        async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user }));
//         } catch (error) {
//           console.log(error);
//         }
//       },

//     }),
//     updateUser: builder.mutation({
//       query: (formData) => ({
//         url: "profile/update",
//         method: "PUT",
//         body: formData,
//         credentials: "include",
//       }),
//     }),
//   }),
// });
// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLogoutUserMutation,
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } = authApi;






import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = `${import.meta.env.VITE_API_BASE_URL}/user/`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    // ✅ Add token to headers from localStorage
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // or from cookies if needed
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "signup",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const token = result.data.token; // 🔐 Save token
          if (token) localStorage.setItem("token", token);
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          localStorage.removeItem("token");
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log("Load user failed:", error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
} = authApi;

