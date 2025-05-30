"use client";

import Link from "next/link";
import login from "/public/images/backgroundLogin1.webp";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleGithubLogin from "@/components/Shared/GoogleGithubLogin";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

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
  const message: string = "No se pudo obtener tu correo de GitHub. Por favor, verifica que tu correo esté público o utiliza otro método de inicio de sesión.";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const resp = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: path || "/",
    });

    if (resp?.status === 200) {
      router.push("/");
    } else {
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
    <div className="max-h-screen flex items-center justify-center bg-gray-100 mt-12 py-14 px-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
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
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
                  Iniciar sesión
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
