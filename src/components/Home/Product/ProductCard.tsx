"use client";
import Link from "next/link";
import Image from "next/image";
import { TProduct } from "@/types";
import { memo, useState, useCallback } from "react";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { name, image, ratings, price, description, _id } = product;
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const displayPrice = typeof price === 'string' ? price : `$${price}`;
  const safeRatings = Math.max(0, Math.min(5, ratings || 0));

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-52 overflow-hidden bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <Image
          src={imageError ? "/default-profile.jpg" : (image || "/default-profile.jpg")}
          alt={name || "Product image"}
          fill
          className={`object-cover hover:scale-105 transition-transform duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 truncate" title={name}>
          {name}
        </h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2" title={description}>
          {description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-semibold text-sky-700">{displayPrice}</span>
          <div className="flex items-center text-yellow-500" aria-label={`Rating: ${safeRatings} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < safeRatings ? "text-yellow-500" : "text-gray-300"}>
                ⭐
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/products/${_id}`}
          className="block mt-4 text-center text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-300"
          prefetch={false}
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
