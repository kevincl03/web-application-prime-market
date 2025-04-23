/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { TService } from "@/types";
import Link from "next/link";
import { useState } from "react";

interface ServicesCardProps {
  service: TService;
}

const CategoryCard = ({ service }: ServicesCardProps) => {
  const { name, image, price, _id } = service;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card bg-base-100 w-50 md:w-60 shadow-lg m-3 overflow-hidden relative border rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/services/${_id}`}>
        <figure
          className="relative w-full h-40 cursor-pointer"
          style={{ overflow: "hidden" }}
        >
          <img
            src={image || "/default-profile.jpg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </figure>
      </Link>
      <div className="card-body p-4 text-center">
        <h2 className="card-title text-sm lg:text-md font-semibold">{name}</h2>
        {/* <p className="text-sm text-gray-600 mb-4">{description}</p> */}
        <p className="text-lg font-semibold text-gray-800">Precio: ${price}</p>
      </div>
      {isHovered && (
        <Link
          href={`/cart/${_id}`}
          className="absolute top-2 left-2 bg-orange-500 text-white font-semibold py-1 px-4 rounded hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
        >
          Añadir al Carrito
        </Link>
      )}
      <div
        className={`card-actions justify-center absolute bottom-4 w-full transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          href={`/services/${_id}`}
          className="bg-blue-600 text-white py-2 px-5 rounded font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
