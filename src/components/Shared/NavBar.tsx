/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "/public/icons/logo.svg";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();

  return (
    <header className="bg-gray-100 shadow-lg w-full fixed top-0 z-50">
      <nav className="navbar container mx-auto px-4">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
              aria-label="Mobile Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-100 rounded-box mt-3 w-52 p-2 shadow-md"
            >
              <li>
                <Link
                  className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products">Productos</Link>
              </li>
              <li>
                <Link href="/my-bookings">Mis Reservas</Link>
              </li>
              <li>
                <Link href="/about">Acerca de</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center ml-20">
            <Link href="/" className="flex items-center">
              <Image alt="logo" src={Logo} className="w-20 scale-[3]" />
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex mr-16">
          <ul className="menu menu-horizontal space-x-4">
            <li>
              <Link
                className="flex items-center p-2 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
                href="/"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
                href="/products"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
                href="/my-bookings"
              >
                Mis Reservas
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
                href="/about"
              >
                Acerca de
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Buscar"
              className="input input-bordered w-24 md:w-auto bg-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Shopping Cart"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-yellow-300">
                  0
                </span>
              </div>
            </button>
          </div>

          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {(() => {
                    const userImage = session.user?.image;
                    const defaultImage = "/icons/profile.webp";
                    const imageSrc = userImage && userImage.trim() !== "" ? userImage : defaultImage;
                    return (
                      <Image
                        alt="Profile"
                        src={imageSrc}
                        height="40"
                        width="40"
                        className="rounded-full"
                      />
                    );
                  })()}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm bg-gray-100 rounded-box z-[1] mt-1 w-72 p-4 shadow-md"
              >
                <li>
                  <a>{session.user?.name}</a>
                </li>
                <li>
                  <a>{session.user?.email}</a>
                </li>
                <li>
                  <button onClick={() => signOut()} className="text-red-600">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-outline text-green-600 px-4">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
