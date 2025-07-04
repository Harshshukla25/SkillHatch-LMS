// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const COURSE_API = `${import.meta.env.VITE_API_BASE_URL}/course`;
// export const courseApi = createApi({
//   reducerPath: "courseApi",
//   tagTypes:["Refetch_Creator_Course","Refetch_Lecture"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: COURSE_API,
//     credentials: "include"
//   }),
//   endpoints: (builder) => ({
//     createCourse: builder.mutation({
//       query: ({ courseTitle, category }) => ({
//         url: "",
//         method: "POST",
//         body: { courseTitle, category },
//       }),
//       invalidatesTags:["Refetch_Creator_Course"]
//     }),
    
//     getSearchCourse:builder.query({
// query:({searchQuery, categories,sortByPrice})=>{
//   //build qiery string
//   let queryString= `/search?query=${encodeURIComponent(searchQuery) }`;
//   // append category
// if(categories && categories.length > 0){
//   const categoriesString= categories.map(encodeURIComponent).join(",");
//   queryString += `&categories=${categoriesString}`;
// }

// //Apped sort by price if available
// if(sortByPrice){
//   queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
// }

// return{
//  url:queryString,
//  method:"GET",
// }  
// }
//     }),

//     getPublishedCourse:builder.query({
// query:()=>({
//   url:"/published-courses",
//   method:"GET"
// })
//     }),
//     getCreatorCourse: builder.query({
//       query: () => ({
//         url: "",
//         method: "GET", 
//       }),
//        providesTags:["Refetch_Creator_Course"]
//     }),
//     editCourse: builder.mutation({
//         query:({formData,courseId})=>({
//             url:`/${courseId}`,
//             method:"PUT",
//             body:formData,
//         }),
//         invalidatesTags:["Refetch_Creator_Course"]
//     }),
//     getCourseById: builder.query({
//         query:(courseId)=>({
//             url:`/${courseId}`,
//             method:"GET"
//         }),
//         providesTags: (result, error, courseId) => [{ type: "Refetch_Creator_Course", id: courseId }],
//     }),
//     createLecture: builder.mutation({
//       query:({lectureTitle,courseId})=>({
//         url: `/${courseId}/lecture`,
//         method:"POST",
//         body:{lectureTitle}
//       })
//     }),
//     getCourseLecture: builder.query({
//       query:(courseId)=>({
//         url: `/${courseId}/lecture`,
//         method:"GET",
//       }),
//       providesTags:["Refetch_Lecture"]
//     }),
//     editLecture: builder.mutation({
//       query:({lectureTitle,videoInfo,isPreviewFree,courseId,lectureId})=>({
//         url:`/${courseId}/lecture/${lectureId}`,
//         method:"POST",
//         body:{lectureTitle,videoInfo,isPreviewFree}
//       })
//     }),
//      removeLecture: builder.mutation({
//       query:(lectureId)=>({
//         url:`/lecture/${lectureId}`,
//         method:"DELETE",
//       }),
//       invalidatesTags: (result, error, lectureId) => [
//     "Refetch_Lecture",
    
//     "Refetch_Creator_Course"
//   ],
//     }),
//     getLectureById:builder.query({
//       query:(lectureId)=>({
//         url:`/lecture/${lectureId}`,
//         method:"GET"
//       })
//     }),
//     publishCourse: builder.mutation({
//       query:({courseId,query})=>({
//         url:`/${courseId}?publish=${query}`,
//         method:"PATCH"
//       })
//     }),
//     removeCourse: builder.mutation({
//       query: (courseId) => ({
//         url: `/${courseId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Refetch_Creator_Course", "Refetch_Lecture"],
//     }),
    
//   }),
// });

// export const { useCreateCourseMutation,
//   useGetSearchCourseQuery,
//    useGetPublishedCourseQuery,useGetCreatorCourseQuery,useEditCourseMutation, useGetCourseByIdQuery,useCreateLectureMutation,useGetCourseLectureQuery,useEditLectureMutation,useRemoveLectureMutation,useGetLectureByIdQuery,usePublishCourseMutation,useRemoveCourseMutation} = courseApi;
  



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = `${import.meta.env.VITE_API_BASE_URL}/course`;

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),

    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),

    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: (result, error, courseId) => [
        { type: "Refetch_Creator_Course", id: courseId },
      ],
    }),

    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),

    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),

    editLecture: builder.mutation({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, lectureId) => [
        "Refetch_Lecture",
        "Refetch_Creator_Course",
      ],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),

    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),

    removeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Course", "Refetch_Lecture"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} = courseApi;
