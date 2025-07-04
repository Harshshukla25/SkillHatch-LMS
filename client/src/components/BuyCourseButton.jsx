// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const BuyCourseButton = (courseId) => {
//   const [createCheckoutSession, {data,isLoading,isSuccess,isError,error }] =
//     useCreateCheckoutSessionMutation();
//   const purchaseCourseHandler = async () => {
//     await createCheckoutSession(courseId);
//   };
// useEffect(()=>{
//     if(isSuccess){
//         if(data?.url){
//             window.location.href=data.url; //Redirect to stripe checkout URL
//         }else{
//             toast.error("Invalid response from server")
//         }
//         if(isError){
//             toast.error("Invalid response from server")
//         }
//     }

// },[data,isSuccess,isError,error])

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={purchaseCourseHandler}
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 -4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//       Purchase Course
//     </Button>
//   );
// };

// export default BuyCourseButton;


import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      await createCheckoutSession(courseId).unwrap();
    } catch (err) {
      toast.error("Checkout session failed");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        toast.error("Invalid response from server");
      }
    }
    if (isError) {
      toast.error("Something went wrong while creating session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
