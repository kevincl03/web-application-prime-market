/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { TProduct } from "@/types";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, image, ratings, price, description, _id } = product;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={image || "/default-profile.jpg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-semibold text-sky-700">${price}</span>
          <span className="flex items-center text-yellow-500">
            {"⭐".repeat(ratings)}
          </span>
        </div>
        <Link
          href={`/products/${_id}`}
          className="block mt-4 text-center text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-300"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
