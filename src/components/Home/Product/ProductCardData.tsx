/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Suspense, lazy, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import ProductErrorBoundary from "@/components/UI/ProductErrorBoundary";
import VirtualizedProductGrid from "@/components/UI/VirtualizedProductGrid";

// Lazy load ProductCard for better performance
const ProductCard = lazy(() => import("./ProductCard"));

const ProductCardData = () => {
  const { products, loading, error, refetch } = useProducts();
  const [useVirtualization, setUseVirtualization] = useState(products.length > 20);

  if (loading) {
    return <LoadingSkeleton count={12} type="product" />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-2 py-10">
        <div className="flex flex-col items-center justify-center py-8">
          <span className="text-xl text-red-500 mb-4">{error}</span>
          <button 
            onClick={refetch}
            className="px-6 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors duration-200"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Use virtualization for large datasets
  if (useVirtualization && products.length > 20) {
    return (
      <ProductErrorBoundary>
        <section className="container mx-auto px-2 py-10 mr-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-semibold text-gray-900">
              Todos los Productos
            </h1>
            <button
              onClick={() => setUseVirtualization(false)}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Vista Normal
            </button>
          </div>
          <VirtualizedProductGrid 
            products={products}
            loading={loading}
            error={error}
            containerHeight={600}
            itemsPerRow={4}
            itemHeight={400}
          />
        </section>
      </ProductErrorBoundary>
    );
  }  return (
    <ProductErrorBoundary>
      <section className="container mx-auto mt-20 px-2 py-10 mr-8">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-4xl font-semibold text-gray-900">
            Todos los Productos
          </h1>
          {products.length > 20 && (
            <button
              onClick={() => setUseVirtualization(true)}
              className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Vista Optimizada
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Suspense 
                key={product._id} 
                fallback={
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="relative w-full h-52 bg-gray-300"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3 mb-3"></div>
                      <div className="h-8 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                }
              >
                <ProductCard product={product} />
              </Suspense>
            ))
          ) : (
            <div className="col-span-full text-center py-4 text-lg text-gray-500">
              No hay Productos Disponibles en este Momento.
            </div>
          )}
        </div>
      </section>
    </ProductErrorBoundary>
  );
};

export default ProductCardData;
