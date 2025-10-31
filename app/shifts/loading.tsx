export default function LoadingState() {
  return (
    <div className="w-full h-full  p-4">
      <header className="animate-pulse w-full h-15 bg-gray-400 rounded-lg"></header>
      <div className="animate-pulse w-full h-10 my-4 bg-gray-400 rounded-lg"></div>
      <div className="w-full flex flex-row flex-wrap gap-4 ">
        <div className="min-w-100 h-50 bg-gray-400 animate-pulse rounded-lg grow max-w-1/3"></div>
        <div className="min-w-100 h-50 bg-gray-400 animate-pulse rounded-lg grow max-w-1/3"></div>
        <div className="min-w-100 h-50 bg-gray-400 animate-pulse rounded-lg grow max-w-1/3"></div>
        <div className="min-w-100 h-50 bg-gray-400 animate-pulse rounded-lg grow max-w-1/3"></div>
        <div className="min-w-100 h-50 bg-gray-400 animate-pulse rounded-lg grow max-w-1/3"></div>
      </div>
    </div>
  );
}
