// import Navbar from '@/components/navbar'
// import React from 'react'
// import { Outlet } from 'react-router-dom'

// const MainLayout = () => {
//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Navbar/>
// <div className='flex-1 mt-16'>
//     <Outlet/>
// </div>
//     </div>
//   )
// }

// export default MainLayout

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoadUserQuery } from "@/features/api/authApi";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useLoadUserQuery();

  useEffect(() => {
    if (isSuccess && data?.user) {
      // Optional: Already handled in onQueryStarted of loadUser
      console.log("User loaded from API:", data.user);
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
