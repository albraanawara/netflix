export const Loading = () => {
    return (
  <div className="flex justify-center items-center h-screen bg-zinc-950 text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-zinc-700 border-t-teal-500 rounded-full animate-spin"></div>

      <h2 className="text-2xl font-bold text-teal-400 animate-pulse">
        Loading...
      </h2>

      <p className="text-zinc-500 text-sm">Please wait a moment</p>
    </div>
  </div>
)
};