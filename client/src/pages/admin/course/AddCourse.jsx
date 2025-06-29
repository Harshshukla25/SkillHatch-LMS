// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { useCreateCourseMutation } from '@/features/api/courseApi'

// import { Loader2 } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'

// const AddCourse = () => {
//     const [courseTitle,setCourseTitle]=useState("");
//     const [category,setCategory]=useState("")
//     const [createCourse,{data,isLoading,error,isSuccess}]=useCreateCourseMutation();
//     const navigate=useNavigate();
   
    

//     const getSelectedCategory=(value)=>{
//        setCategory(value) 
//     }
//      const createCourseHandler=async()=>{
//      await createCourse({courseTitle,category})
//     console.log(courseTitle,category)
//     }
    
   
    
//     // for displaying toast
// useEffect(()=>{
//   if(isSuccess){
//     toast .success(data?.message|| "Course c reated.");
//     navigate("/admin/course")
//   }
// },[isSuccess,error])

//   return (
//     <div className='felx-1 mx-10'>
//       <div className='mb-4'>
//         <h1 className='font-bold text-xl'>Lets add course, add some basic details for your new course</h1>
//         <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ad?</p>
//       </div>
//       <div  className='space-y-4'>
//         <div>
// <Label>Title</Label>
// <Input
// type="text"
// value={courseTitle}
// onChange={(e)=> setCourseTitle(e.target.value)}
// placeholder="Your Course Name"
// />
//         </div>
//          <div>
// <Label>Category</Label>
// <Select onValueChange={getSelectedCategory}>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a category" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Category</SelectLabel>
//           <SelectItem value="Next js">Next js</SelectItem>
//           <SelectItem value="Data Science">Data Science</SelectItem>
//           <SelectItem value="JavaScript">JavaScript</SelectItem>
//           <SelectItem value="Java">Java</SelectItem>
//           <SelectItem value="React Js">React Js</SelectItem>
//           <SelectItem value="Frontent Web Development">Frontent Web Development</SelectItem>
//           <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
//           <SelectItem value="Docker">Docker</SelectItem>
//           <SelectItem value="Python">Python</SelectItem>
//           <SelectItem value="MongoDB">MongoDB</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//         </div>
//         <div className='flex items-center gap-2'>
//             <Button variant="outline" onClick={()=> navigate("/admin/course")}>Back</Button>
//             <Button disabled={isLoading} onClick={createCourseHandler}>
//                 {
//                     isLoading ?(
//                         <>
//                         <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
//                         Please Wait
//                         </>
//                      ) : "Create"
//                 }
//             </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddCourse


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('')
  const [category, setCategory] = useState('')
  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation()
  const navigate = useNavigate()

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category })
    console.log(courseTitle, category)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'Course created.')
      navigate('/admin/course')
    }
  }, [isSuccess, error])

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add a new course
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Provide basic details to get started with your course.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Popular Categories</SelectLabel>
                <SelectItem value="Next js">Next.js</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="React Js">React.js</SelectItem>
                <SelectItem value="Frontend Web Development">
                  Frontend Web Development
                </SelectItem>
                <SelectItem value="Full Stack Development">
                  Full Stack Development
                </SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/course')}
            className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="bg-indigo-950 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-white transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
