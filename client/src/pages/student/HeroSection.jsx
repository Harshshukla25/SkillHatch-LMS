import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] py-20 px-6 sm:px-10 transition">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">

        {/* Left Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://motionarray.imgix.net/1666255-3VvVbNw7xQ-high_0004.jpg?w=660&q=60&fit=max&auto=format"
            alt="Student Learning"
            className="w-full max-w-xl h-95 max-h-[600px] object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Build The Skills To Drive Your Career
          </h1>

          <p className="text-gray-700 dark:text-slate-300 max-w-md mx-auto md:mx-0 text-base sm:text-lg">
            Discover, learn, and upskill with our wide range of expert-led courses designed to help you succeed.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white dark:bg-slate-800 rounded-full shadow-md overflow-hidden max-w-md mx-auto md:mx-0"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for courses like "Web Dev" or "Data Science"...'
              className="flex-grow px-6 py-3 border-none focus-visible:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
            />
            <Button
              type="submit"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
              Search
            </Button>
          </form>

          {/* Explore Courses - centered and just below search */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => navigate("/course/search?query")}
              className="bg-blue-200 text-blue-700 hover:bg-blue-300 dark:bg-blue-700 dark:text-white dark:hover:hover:bg-blue-800 px-6 py-3 rounded-full transition mr-35"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
