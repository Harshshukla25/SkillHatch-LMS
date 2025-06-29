import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading)
    return <h1 className="text-center text-xl font-semibold mt-20">Loading...</h1>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Courses</h1>
        <Button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition"
        >
          Create New Course
        </Button>
      </div>
      <Table>
        <TableCaption className="text-gray-500 dark:text-gray-400 mt-2">
          A list of your recent courses.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow
              key={course._id}
              className="hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <TableCell className="font-medium">
                ₹{course?.coursePrice ?? "NA"}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    course.isPublished
                      ? "bg-emerald-500 text-white"
                      : "bg-yellow-500 text-white"
                  }
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-800 dark:text-gray-200">
                {course.courseTitle}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700 transition flex items-center gap-1"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;

