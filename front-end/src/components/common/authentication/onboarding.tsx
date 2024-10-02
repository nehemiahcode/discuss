"use client";

import { useGetSingleUserByIdQuery, useUpdateUserMutation } from "@/lib/hooks/user";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import Image from "next/image";
import { toast } from "sonner";

const updateUserSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    bio: Yup.string().required("Bio is required"),
    fullname: Yup.string().required("Fullname is required"),
    onboarding: Yup.boolean().default(false)
});

interface OnboardingProps {
    userId: string;
}

function Onboarding({ userId }: OnboardingProps) {
    const router = useRouter();
    const [updateUser, { isLoading, error: updateErr }] = useUpdateUserMutation();
    const { data, error: err, isLoading: loading } = useGetSingleUserByIdQuery(userId);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Redirect if the user is already onboarded
    if (data?.user.onboarded === true) router.replace("/dashboard/feeds");

    // React-dropzone setup for image uploads
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/svg': [],
            'image/jpg': [],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setImageFile(file);
            const imagePreview = URL.createObjectURL(file);
            setPreview(imagePreview);
        },
    });

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const formik = useFormik({
        initialValues: {
            username: data?.user?.username || "",
            email: data?.user?.email || "",
            bio: data?.user?.bio || "",
            fullname: data?.user?.fullname || "",
            onboarded: false
        },
        validationSchema: updateUserSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("bio", values.bio);
            formData.append("fullname", values.fullname);
            formData.append("onboarded", "false"); 
            if (imageFile) {
                formData.append("image", imageFile); 
            }

            try {
                const update = await updateUser({
                    userId,
                    formData, 
                }).unwrap();
                if (update) {
                    toast.message(update?.message)
                    console.log(update)
                }
            } catch (error: any) {
                console.error("Update failed", error);
                const errorMessage = error?.data?.message;
                toast.error(errorMessage);
            }
        },
    });

    const { touched, errors, isSubmitting } = formik;

    return (
        <div className=" max-w-xl mx-auto flex flex-col items-center justify-center min-h-full">
            <h1>Onboarding Page</h1>

            <form onSubmit={formik.handleSubmit} className="w-full bg-white flex flex-col shadow-sm rounded-[4px] p-4 gap-3 border">
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className=" rounded border p-2 w-full text-gray-600 outline-none"
                    />
                    {touched.username && errors.username ? (
                        <div className="text-red-500 text-xs">{typeof errors.username === 'string' ? errors.username : 'Invalid username'}</div>
                    ) : null}

                </div>

                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        onChange={formik.handleChange}
                        value={formik.values.bio}
                        name="bio"
                        id="bio"
                        maxLength={200}
                        className=" rounded resize-none h-24 outline-none border p-3 w-full text-gray-600"
                    />
                    {touched.bio && errors.bio ? (
                        <div className="text-red-500 text-xs">{typeof errors.bio === 'string' ? errors.bio : 'Invalid username'}</div>
                    ) : null}
                     <div>200/{formik.values.bio.length}</div>
                </div>

                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        id="fullname"
                        name="fullname"
                        placeholder="Full name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                        className=" rounded border p-2 w-full text-gray-600 outline-none"
                    />
                    {touched.fullname && errors.fullname ? (
                        <div className="text-red-500 text-xs">{typeof errors.fullname === 'string' ? errors.fullname : 'Invalid username'}</div>
                    ) : null}

                </div>

                Image upload using react-dropzone
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {imageFile ? (
                        <div className=" relative h-14 w-14">
                            <Image src={preview || data?.user.image} alt="" fill className="h-full w-full object-cover object-center" />
                        </div>
                    ) : (
                        <div>
                            <div className=" relative h-14 w-14">
                                <Image src={data?.user.image} alt="" fill className="h-full w-full object-cover object-center" />
                            </div>
                            upload your images here
                        </div>
                    )}
                </div>

                <button className="w-full rounded-[5px] p-3 text-center text-white disabled:bg-gray-300 bg-blue-600" type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Onboarding;
