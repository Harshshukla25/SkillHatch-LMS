// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { CheckCircle2, CirclePlay } from "lucide-react";
// import React from "react";

// const CourseProgress = () => {
//   const isCompleted = false;
//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-20">
//       {/* Display course name */}
//       <div className="flex justify-between mb-4">
//         <h1
//           className="text-2xl
// font-bold"
//         >
//           Course Title
//         </h1>
//         <Button>Completed</Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/*video section */}
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <div>{/* <video/> */}</div>

//           <div className="m-2">
//             <h3 className="font font-medium text-lg">
//               Lecture-1: Introduction{" "}
//             </h3>
//           </div>
//         </div>
//         {/* lecture sidebar */}
//         <div className="flex flex-col w-full md:w-2/5 border-t  md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
//           <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
//           <div className="flex-1 overflow-y-auto">
//             {[1, 2, 3, 4].map((lecture, idx) => (
//               <Card
//                 key={idx}
//                 className="mb-3 hover:cursor-pointer transition transform"
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {isCompleted ? (
//                       <CheckCircle2 size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     <div>
//                       <CardTitle className="text-lg font-medium">Introduction</CardTitle>
//                     </div>
//                   </div>
//                   <Badge variant={'outline'} className="bg-green-200 text-green-600">Completed</Badge>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCheck, CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

 useEffect(()=>{
    console.log(markCompleteData)
if(completedSuccess){
  refetch();
  toast.success(markCompleteData.message)
}
if(inCompletedSuccess){
  refetch();
  toast.success(markInCompleteData.message)
}
  },[completedSuccess,inCompletedSuccess])




  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>
        Failed to load course <details></details>
      </p>
    );

  console.log(data);

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  //initialize the first lecture is not exist
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };


  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };


  //Handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    {/*handleLectureProgress(lecture._id) */}
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

 
  return (
    <div className="max-w-7xl mx-auto p-4 ">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" :"default" }
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              crossOrigin="anonymous"
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
          </div>
          <div className="mt-2">
            <h3 className="text-base font-semibold">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>

        {/* Lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="text-xl font-semibold mb-3">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-1 pr-1">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`hover:cursor-pointer transition transform border border-gray-200 ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200"
                    : "dark:bg-gray-800"
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-2">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <CirclePlay size={14} className="text-gray-500" />
                    )}
                    <CardTitle className="text-lg font-medium m-0">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600 text-[10px] px-1.5 py-0 rounded"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
