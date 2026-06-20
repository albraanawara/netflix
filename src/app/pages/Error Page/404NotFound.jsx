import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-950 text-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-teal-400 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-white mb-2">
          Page Not Found
        </h2>

        <p className="text-zinc-400 mb-8 max-w-md">
          The page you're looking for doesn't exist
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/movies"
            className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-xl transition font-bold"
          >
            Go To Movies
          </Link>

          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/movies");
              }
            }}
            className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-8 py-3 rounded-xl transition font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
