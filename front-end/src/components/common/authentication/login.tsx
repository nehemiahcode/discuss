"use client";

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
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "@/lib/hooks/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoginImage from "../../../../public/images/login.svg";
import { ImSpinner9 } from "react-icons/im";
import React from "react";


const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"), // Added required validation
  password: Yup.string().required("Password is required"), // Added required validation
});

export function LoginForm() {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values).unwrap(); // Attempt to log the user in
        if (response) {
          toast.success(response.message);
          sessionStorage.setItem("token", response.token);
          console.log("fulfilled", response);
          router.push(`/onboarding/${response.user.id}`);
        }
        // If successful, show success toast
      } catch (error: any) {
        // Show error toast if login fails
        const errorMessage = error?.data?.message;
        toast.error(errorMessage);
        console.error("rejected", error);
      }
    },
  });
  const { touched, errors, isSubmitting } = formik;


  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-2 place-content-center  min-h-screen bg-slate-900">
        <div className="flex items-center justify-center h-full py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <Card className="w-full max-w-sm bg-slate-800 text-white border-gray-500">
              <CardHeader className="px-3">
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account.
                </CardDescription>
              </CardHeader>
              <form onSubmit={formik.handleSubmit}>
                <CardContent className="grid gap-4 px-3">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      disabled={formik.isSubmitting}
                      onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      className="rounded"
                    />
                    {touched.email && errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      type="password"
                      disabled={formik.isSubmitting}
                      onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      className="rounded"
                    />
                    {touched.password && errors.password && (
                      <span className="text-red-500 text-xs">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-2 px-3">
                  <Button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 rounded text-white"
                  >
                    {isSubmitting ? <ImSpinner9 className="animate-spin" /> : "Sign in"}
                  </Button>
                  {/* <Button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full bg-white rounded font-medium flex items-center gap-2 text-black hover:bg-gray-50 duration-150 active:bg-gray-100"
                  >
                    <FcGoogle size={23} />
                    Continue with Google
                  </Button> */}
                  <span className="text-sm ">Don't have an account <Link className="underline" href={"/signup"}>Create one</Link></span>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>

        <div className="flex flex-col h-full w-full relative">
          <Image
            src={LoginImage}
            alt="Image"
            fill
            className="h-full w-full object-contain object-center"
          />
        </div>
      </div>
    </>
  );
}
