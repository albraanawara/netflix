import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Component = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-sm text-center shadow-2xl">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="profile avatar"
          className="w-28 h-28 rounded-full mx-auto border-4 border-teal-500 mb-6 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-teal-400 mb-1">{user?.name}</h2>
        <p className="text-zinc-400 text-sm mb-6">{user?.email}</p>
        <div className="bg-zinc-800 rounded-xl p-4 text-left space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Name</span>
            <span className="text-white font-medium">{user?.name}</span>
          </div>
          <hr className="border-zinc-700" />
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Email</span>
            <span className="text-white font-medium">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
