"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TProduct } from '@/types';
import ProductCard from '@/components/Home/Product/ProductCard';
import LoadingSkeleton from '@/components/UI/LoadingSkeleton';
import { createIntersectionObserver, debounce } from '@/utils/performance';

interface VirtualizedProductGridProps {
  products: TProduct[];
  loading: boolean;
  error: string;
  itemsPerRow?: number;
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
}

const VirtualizedProductGrid: React.FC<VirtualizedProductGridProps> = ({
  products,
  loading,
  error,
  itemsPerRow = 4,
  itemHeight = 400,
  containerHeight = 800,
  overscan = 3,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<TProduct[]>([]);

  // Calculate grid dimensions
  const totalRows = Math.ceil(products.length / itemsPerRow);
  const totalHeight = totalRows * itemHeight;

  // Calculate visible range
  const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endRow = Math.min(
    totalRows - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  // Get visible products
  const getVisibleProducts = useMemo(() => {
    const visibleItems: TProduct[] = [];
    for (let row = startRow; row <= endRow; row++) {
      const startIndex = row * itemsPerRow;
      const endIndex = Math.min(startIndex + itemsPerRow, products.length);
      visibleItems.push(...products.slice(startIndex, endIndex));
    }
    return visibleItems;
  }, [products, startRow, endRow, itemsPerRow]);  // Debounced scroll handler
  const debouncedScroll = useMemo(
    () => debounce((...args: unknown[]) => {
      const scrollTop = args[0] as number;
      setScrollTop(scrollTop);
    }, 16),
    []
  );

  const handleScroll = useCallback(
    (e: Event) => {
      const target = e.target as HTMLDivElement;
      debouncedScroll(target.scrollTop);
    },
    [debouncedScroll]
  );

  // Update visible products
  useEffect(() => {
    setVisibleProducts(getVisibleProducts);
  }, [getVisibleProducts]);

  // Setup scroll listener
  useEffect(() => {
    if (!containerRef) return;

    containerRef.addEventListener('scroll', handleScroll);
    return () => containerRef.removeEventListener('scroll', handleScroll);
  }, [containerRef, handleScroll]);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!containerRef) return;

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Observe all images in the container
    const images = containerRef.querySelectorAll('img[data-src]');
    images.forEach((img) => observer?.observe(img));

    return () => observer?.disconnect();
  }, [containerRef, visibleProducts]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div
      ref={setContainerRef}
      className="relative overflow-auto"
      style={{ height: containerHeight }}
    >
      <div
        className="relative"
        style={{ height: totalHeight }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 absolute w-full"
          style={{
            top: startRow * itemHeight,
            transform: 'translateZ(0)', // Enable hardware acceleration
          }}
        >
          {visibleProducts.map((product, index) => (
            <div
              key={`${product._id}-${index}`}
              style={{ height: itemHeight }}
              className="flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedProductGrid;
