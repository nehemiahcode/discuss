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
import { useSignUpMutation } from "@/lib/hooks/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoginImage from "../../../../public/images/login.svg";
import { ImSpinner9 } from "react-icons/im";


const signupSchema = Yup.object({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
})
export function SignupForm() {
    const [signUp] = useSignUpMutation();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            try {
                const response = await signUp(values).unwrap(); // Attempt to log the user in
                if (response) {
                    toast.success(response.message);
                    router.push("/login");
                }
            } catch (error: any) {

                const errorMessage = error?.data?.message;
                toast.error(errorMessage);
                console.error("rejected", error);
            }
        },
    });
    const { touched, errors, isSubmitting } = formik;

    // const handleGoogleLogin = () => {
    //   window.open(`${backendBaseUrl}/auth/google`, "_self");
    // };

    return (
        <section>
            <div className="w-full lg:grid lg:grid-cols-2 place-content-center  min-h-screen bg-slate-900">
                <div className="flex items-center justify-center h-full py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <Card className="w-full max-w-sm bg-slate-800 text-white border-gray-500">
                            <CardHeader className="px-3">
                                <CardTitle className="text-2xl">Sign up</CardTitle>
                                <CardDescription>
                                    Enter your information to create an account
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={formik.handleSubmit}>
                                <CardContent className="grid gap-4 px-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullname">Fullname</Label>
                                        <Input
                                            name="fullname"
                                            type="text"
                                            placeholder="john doe"
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
                                        {isSubmitting ? <ImSpinner9 className="animate-spin" /> : "Sign up"}
                                    </Button>
    
                                    <span className="text-sm ">Already have an account <Link className="underline" href={"/login"}>Login</Link></span>
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
        </section>
    );
}
