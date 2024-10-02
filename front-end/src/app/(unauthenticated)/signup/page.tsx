import { SignupForm } from '@/components/common/authentication/signup'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Sign up",
    description: "Sign up for an account to get started",
};

function SignUpPage() {
    return (
        <SignupForm />
    )
}

export default SignUpPage
