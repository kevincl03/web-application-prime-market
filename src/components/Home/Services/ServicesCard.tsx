/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import { TService } from "@/types";

interface ServicesCardProps {
  service: TService;
}

const ServicesCard = ({ service }: ServicesCardProps) => {
  const { _id, name, price, image, ratings } = service;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card bg-white w-full max-w-sm shadow-lg m-3 overflow-hidden relative border rounded-lg transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/services/${_id}`}>
        <figure className="relative w-full h-60 overflow-hidden">
          <img
            src={image || "/default-profile.jpg"} // Fallback to default image
            alt={name}
            className="object-cover w-full h-full"
            width={250}
            height={120}
          />
        </figure>
      </Link>

      <div className="card-body p-6">
        <h2 className="card-title text-xl font-semibold text-gray-900">
          {name}
        </h2>
        {/* <p className="text-sm text-gray-600 mb-4">{description}</p> */}
        <p className="text-lg font-semibold text-gray-800">Precio: ${price}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">{"⭐".repeat(ratings)}</span>
        </div>
      </div>

      {isHovered && (
        <Link
          href={`/cart/${_id}`}
          className="absolute top-4 left-4 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
        >
          Añadir al Carrito
        </Link>
      )}

      <div
        className={`card-actions justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 absolute bottom-4 w-full`}
      >
        <Link
          href={`/services/${_id}`}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
