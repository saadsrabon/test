const ProductSkeleton = () => {
  return (
    <div className="w-full bg-slate-300/20 p-4 mx-auto rounded-2xl space-y-3 shadow-md animate-pulse">
      {/* Card Image Skeleton */}
      <div className="w-full h-[160px] bg-gray-400 rounded-2xl"></div>

      {/* Content and Icon Section */}
      <div className="flex justify-between mt-3">
        {/* Content Section */}
        <div className="flex-1 space-y-2">
          {/* Card Heading Skeleton */}
          <div className="h-5 w-3/4 bg-gray-300 rounded"></div>

          {/* Date and Distance Skeleton */}
          <div className="space-y-1">
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          </div>

          {/* Price Skeleton */}
          <div className="h-5 w-1/4 bg-gray-300 rounded"></div>
        </div>

        {/* Icon Skeleton */}
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
