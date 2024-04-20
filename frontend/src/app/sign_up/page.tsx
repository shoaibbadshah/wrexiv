"use client";

import React, { useState } from "react";
import Container from "@/components/molecules/Container";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUpToFirebaseAuth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import useFlash from "@/hooks/useFlash";
import Image from "next/image";
import ProviderAuthButtons from "@/components/molecules/ProviderAuthButtons";

interface IFormInput {
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const router = useRouter();
  const { showMessage } = useFlash();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (params: IFormInput) => {
    try {
      const { email, password } = params;
      const result = await signUpToFirebaseAuth(email, password);
      showMessage("Please verify your email address", "success");
      router.replace("/sign_in");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] px-36 grid grid-cols-8 items-center justify-center space-x-24">
      <div className="col-span-3">
        <h1 className="text-xl font-bold mb-6">Sign Up</h1>
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="border px-3 py-2 rounded w-full"
              />
              {errors.email && (
                <p className="mt-1 text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="border px-3 py-2 rounded w-full"
              />
              {errors.password && (
                <p className="mt-1 text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>{error && <p className="mt-1 text-red-500">{error}</p>}</div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center mt-4 flex space-x-2 items-center justify-center">
              <p className="text-sm">Already have an account?</p>
              <Link href="/sign_in">
                <p className="text-blue-600 hover:underline">Sign in</p>
              </Link>
            </div>
          </form>
          <div>
            <ProviderAuthButtons />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full col-span-5">
        <Image
          src="/signup.png"
          alt="signup"
          layout="fill"
          objectFit="contain"
          className="w-full p-24"
        />
      </div>
    </div>
  );
};

export default SignUp;
