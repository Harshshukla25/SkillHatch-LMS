import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/authSlice";

const Login = () => {
  const [signupInput, setSigupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSigupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }

    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      dispatch(userLoggedIn({ user: loginData.user }));
      navigate("/");
    }

    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [
    loginIsSuccess,
    registerIsSuccess,
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    dispatch,
    navigate,
  ]);

  return (
    <div className="min-h-screen pt-4 flex items-start justify-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-black dark:to-zinc-900 px-4 font-sans transition-colors">
      <Tabs
        defaultValue="login"
        className="w-full max-w-md shadow-md rounded-xl bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-4"
      >
        <TabsList className="grid grid-cols-2 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2">
          <TabsTrigger
            value="signup"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-200 py-2"
          >
            Signup
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-200 py-2"
          >
            Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="pb-1">
              <CardTitle className="text-xl leading-tight">Create Account</CardTitle>
              <CardDescription className="text-sm">
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 py-1">
              <div>
                <Label htmlFor="name" className="text-sm">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. John Doe"
                  required
                  className="py-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. john@example.com"
                  required
                  className="py-1.5"
                />
              </div>
              {/* Password input with icon */}
              <div className="relative">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  type={showSignupPassword ? "text" : "password"}
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="••••••••"
                  required
                  className="pr-9 py-1.5"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword((v) => !v)}
                  className="absolute right-2 top-[34px] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  tabIndex={-1}
                  aria-label={showSignupPassword ? "Hide password" : "Show password"}
                >
                  {showSignupPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div>
                <Label htmlFor="role" className="text-sm">Select Role</Label>
                <select
                  name="role"
                  value={signupInput.role}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  className="w-full border rounded-md px-3 py-1.5 bg-white dark:bg-zinc-800 dark:text-white"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <Button
                className="w-full bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600 transition font-semibold py-2"
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="pb-1">
              <CardTitle className="text-xl leading-tight">Login</CardTitle>
              <CardDescription className="text-sm">
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 py-1">
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. john@example.com"
                  required
                  className="py-1.5"
                />
              </div>
              <div className="relative">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="••••••••"
                  required
                  className="pr-9 py-1.5"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword((v) => !v)}
                  className="absolute right-2 top-[34px] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  tabIndex={-1}
                  aria-label={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <Button
                className="w-full bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600 transition font-semibold py-2"
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;






