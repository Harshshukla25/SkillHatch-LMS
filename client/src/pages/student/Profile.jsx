import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isSuccess,
      isError,
      error,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    try {
      const result = await updateUser(formData).unwrap();
      toast.success(result.message || "Profile updated");
      refetch();
      setIsDialogOpen(false);
      setPreviewUrl("");
      setProfilePhoto("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    if (data?.user?.name) {
      setName(data.user.name);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(updateUserData?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [isSuccess, isError, error, updateUserData]);

  if (isLoading || !data) {
    return (
      <div className="max-w-4xl mx-auto px-24 my-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  const user = data && data.user;

  return (
    <div className="py-5 px-6 sm:px-10  max-w-5xl mx-auto mt-5 mb-20">
      <h1 className="font-bold text-3xl text-center md:text-left text-gray-900 dark:text-white mb-6">
        Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 my-10">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 ring-4 ring-blue-200 dark:ring-slate-600 shadow-xl">
            <AvatarImage
              src={previewUrl || user.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-3">
            <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-3">
            <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-3">
            <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setPreviewUrl("");
                setProfilePhoto("");
                if (data?.user?.name) setName(data.user.name);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2 hover:cursor-pointer">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-xl text-gray-900 dark:text-white mb-4">
          Courses you're enrolled in
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user.enrolledCourses.length === 0 ? (
            <h1 className="text-gray-600 dark:text-gray-300">
              You haven't enrolled in any courses
            </h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
