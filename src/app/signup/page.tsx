/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";
import login from "/public/images/backgroundLogin1.webp";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema de validacion
const signUpSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsRegistering(true);
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup/api`,
        data,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (resp?.status === 200) {
        const loginResp = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (loginResp?.ok && !loginResp.error) {
          window.location.href = "/";
        } else {
          setIsRegistering(false);
          toast.info("Error al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.");
        }
      }
    } catch (error: any) {
      //console.error("Sign Up failed", error);
      if (error.response) {
        setIsRegistering(false);
        if (error.response.status === 409) {
          toast.info("El email ingresado, ya se encuentra en uso. Ingresa otro email.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20 pb-8 px-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 my-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          <span className="text-sky-600">Registrate en Prime Market</span>
        </h2>
        <div className="flex gap-6">
          <div className="hidden lg:block w-1/2">
            <Image
              src={login}
              width={600}
              height={300}
              alt="Página de registro"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Nombre completo"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
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
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-900 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:from-sky-900 hover:to-sky-900 focus:outline-none focus:ring-4 focus:ring-sky-500 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  {isRegistering ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-sky-600 hover:underline">
                Iniciar sesión
              </Link>
            </p>
            <div className="text-center mt-6 text-gray-500 divider">O</div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="p-3 bg-white border rounded-full shadow-md hover:shadow-lg">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  width={30}
                  height={30}
                  alt="github logo"
                />
              </button>
              <button className="p-3 bg-white border rounded-full shadow-md hover:shadow-lg">
                <Image
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                  width={30}
                  height={30}
                  alt="google logo"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
