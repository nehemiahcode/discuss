import { LoginForm } from "@/components/common/authentication/login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account and continue",
};

function LoginPage() {
    return <LoginForm />;
}

export default LoginPage;
