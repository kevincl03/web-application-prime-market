/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { getProductsDetails } from "@/services/getServices";
import Link from "next/link";

interface Product {
  name: string;
  ratings: number;
  image: string;
  price: number;
  description: string;
  _id: string;
}

interface ProductDetailsResponse {
  product?: Product;
}

type Params = {
  id: string;
};

const productPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const details = (await getProductsDetails(
    id
  )) as ProductDetailsResponse;

  if (!details?.product) {
    return (
      <div className="container mx-auto p-6 ">
        <h2 className="text-2xl font-semibold">Servicio no encontrado</h2>
        <p className="text-gray-600">
          No se pudieron encontrar los detalles del servicio solicitado.
        </p>
      </div>
    );
  }

  const { name, ratings, image, price, description, _id } = details.product;

  return (
    <div className="container mx-auto p-6 grid lg:grid-cols-2 gap-8 mt-20">
      <div className="space-y-4">
        <div className="flex justify-center">
          <img
            src={image || "/default-profile.jpg"}
            alt="Product Image"
            className="rounded-lg shadow-lg object-cover w-full max-w-md h-80"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold">{name}</h2>
          <p className="text-gray-600">{description}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 font-semibold mr-2">
              {ratings} ★
            </span>
            <span className="text-gray-500">Rating</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-blue-600">${price}</span>
            {price && (
              <span className="ml-2 text-gray-500 line-through">${price}</span>
            )}
          </div>
          <p
            className={`font-semibold mt-1 ${
              ratings > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {ratings > 0 ? "En Stock" : "Agotado"}
          </p>
        </div>

        <div className="flex items-center space-x-4">
            <label
              htmlFor="quantity"
              className="font-semibold text-gray-700"
            >
              Cantidad:
            </label>
          <input
            type="number"
            id="quantity"
            min="1"
            defaultValue="1"
            className="w-16 p-2 border border-gray-300 rounded-md"
          />
          <Link
            href={`/checkout/${_id}`}
            className="px-4 py-2 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded shadow-lg hover:bg-green-900 transition-transform duration-300 transform hover:scale-105"
          >
            Comprar Ahora
          </Link>
          <Link
            href={`/cart/${_id}`}
            className="px-4 py-2 bg-yellow-700 text-white text-sm lg:text-lg font-semibold rounded shadow-lg hover:bg-sky-600 transition-transform duration-300 transform hover:scale-105"
          >
            Añadir al Carrito
          </Link>
        </div>
      </div>
    </div>
  );
};

export default productPage;
