"use client";

import Container from "@/components/molecules/Container";
import ProviderAuthButtons from "@/components/molecules/ProviderAuthButtons";
import { FIRST_APP_PAGE } from "@/constants/urls";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFlash from "@/hooks/useFlash";
import { signInToFirebaseAuth, signInWithGoogle } from "@/lib/firebase";
import { sendEmailVerification } from "@firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const SingIn = () => {
  const router = useRouter();
  const { showMessage } = useFlash();
  const { refetch: refetchUser } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (params: IFormInput) => {
    const { email, password } = params;
    const result = await signInToFirebaseAuth(email, password);
    if (result.user.emailVerified) {
      await refetchUser();
      router.replace(FIRST_APP_PAGE);
    } else {
      await sendEmailVerification(result.user);
      showMessage("Please verify your email address", "error");
    }
  };

  return (
    <div className="w-full mx-auto my-40 flex justify-center">
      <p></p>
      <Container>
        <h1 className="text-xl font-bold mb-6">Sign In</h1>
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

            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                Sign In
              </button>
            </div>
            <div className="text-center mt-4 flex space-x-2 items-center justify-center">
              <p className="text-sm">{"Don't have an account?"}</p>
              <Link href="/sign_up">
                <p className="text-blue-600 hover:underline">Sign up</p>
              </Link>
            </div>
          </form>
          <div>
            <ProviderAuthButtons />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingIn;
