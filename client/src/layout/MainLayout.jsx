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
import { userLoggedIn } from "@/features/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.user) {
          dispatch(userLoggedIn({ user: data.user }));
        }
      } catch (err) {
        console.log("User not logged in");
      }
    };

    fetchProfile();
  }, [dispatch]);

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
