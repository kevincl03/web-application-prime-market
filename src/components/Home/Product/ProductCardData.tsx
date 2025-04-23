/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getProducts } from "@/services/getServices";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types";

const ProductCardData = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl text-gray-500">Cargando Servicios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-2 py-10 mr-8">
      <h1 className="text-4xl font-semibold text-center mb-10 text-gray-900">
        Todos los Productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-lg text-gray-500">
            No hay Servicios Disponibles en este Momento.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCardData;
