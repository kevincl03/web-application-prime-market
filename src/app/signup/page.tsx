/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";
import login from "/public/images/backgroundLogin1.webp";

const SignUp = () => {
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const newUser = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXTAUTH_URL}/signup/api`,
        newUser,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        target.reset();
      }
    } catch (error) {
      console.error("Sign Up failed", error);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-100 mt-16 py-14 px-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
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
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
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
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-900 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:from-sky-900 hover:to-sky-900 focus:outline-none focus:ring-4 focus:ring-sky-500 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Registrarse
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
