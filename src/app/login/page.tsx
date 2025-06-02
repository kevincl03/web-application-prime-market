/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import login from "/public/images/backgroundLogin1.webp";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleGithubLogin from "@/components/Shared/GoogleGithubLogin";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema de validacion
const signUpSchema = z.object({
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginContent router={router} />
    </Suspense>
  );
};

interface LoginContentProps {
  router: ReturnType<typeof useRouter>;
}

const LoginContent = ({ router }: LoginContentProps) => {
  const searchParams = useSearchParams();
  const path = searchParams?.get("redirect");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const message: string = "No se pudo obtener tu correo de GitHub. Por favor, verifica que tu correo esté público o utiliza otro método de inicio de sesión.";

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignUpForm>({
      resolver: zodResolver(signUpSchema),
    });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoggingIn(true);
    const resp = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: path || "/",
    });

    if (resp?.ok && !resp.error) {
      window.location.href = "/";
      
    } else {
      setIsLoggingIn(false);
      console.error("Login failed:", resp?.error);
      toast.info("Email o contraseña incorrectos. Verifica tus credenciales.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "github_error_email") {
      toast.info(message, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20 pb-8 px-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 my-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          <span className="text-sky-600">Iniciar sesión en Prime Market</span>
        </h2>
        <div className="flex gap-6">
          <div className="hidden lg:block w-1/2">
            <Image
              src={login}
              width={900}
              height={200}
              alt="página de inicio de sesión"
              className="rounded-lg object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Contraseña"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Link
                  href="/forget-password"
                  className="block text-sm font-medium text-sky-500"
                >
                  Olvidaste tu Contraseña?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-900 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:from-sky-900 hover:to-sky-900 focus:outline-none focus:ring-4 focus:ring-sky-500 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  {isLoggingIn ? "Iniciando..." : "Iniciar sesión"}
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link href="/signup" className="text-sky-600 hover:underline">
                Registrate
              </Link>
            </p>

            <div className="text-center mt-6 text-gray-500 divider">O</div>
            <GoogleGithubLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
