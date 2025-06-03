import React from "react";

interface LoadingSkeletonProps {
  count?: number;
  type?: "product" | "service" | "category";
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 8, 
  type = "product" 
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div 
      key={index} 
      className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse ${
        type === 'service' ? 'h-64' : type === 'category' ? 'h-48' : 'h-auto'
      }`}
    >
      {/* Image skeleton */}
      <div className="relative w-full h-52 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
        
        {/* Price and rating skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  ));

  return (
    <section className="container mx-auto px-2 py-10 mr-8">
      <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-10 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {skeletons}
      </div>
    </section>
  );
};

export default LoadingSkeleton;
