const LoadingSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-[#e7e4e5] z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-black font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
