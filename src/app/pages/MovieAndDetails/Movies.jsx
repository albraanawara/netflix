import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Loading } from "../../utils/Loading";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { WishlistContext } from "../../context/WishlistContext";

// export const loader = async ({ params }) => {
//     const { id } = params;
//        const { data } = await axios.get( "https://api.themoviedb.org/3/movie/popular", {
//       params: { language: "en-US", page: 1 },
//     headers: {
//         accept: "application/json",
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsInN1YiI6IjY2MmUwYTNmMjRmMmNlMDEyNjJhYWY1NiIsInNjb3BlcyI6WyJhcGxfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B2gaJass2LZ7YG8RB9u2PxXFNBHimDIBXxwQAVSeJDE",
//       },
//     });
//   return data

// }

export const ErrorBoundary = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-4">Oops!</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-lg">Something went wrong while loading the movies.</p>
    </div>
  );
}



export const Component = ({ showPagination = true }) => {
  const result = useLoaderData();
  const [counter, setCounter] = useState(1);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
        params: { language: "en-US", page: counter },
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsIm5iZiI6MTcxNDI5MzMxMS4yLCJzdWIiOiI2NjJlMGEzZjI0ZjJjZTAxMjYyYWFmNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ss1IcpVByzOGldtfb5cWiyf4F-D70wUFmmdA3ie6YLs",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [counter]);

  console.log(movies);
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen px-4 py-6 text-zinc-900 dark:text-white transition-colors">

      {/* Title */}
      <h1 className="text-teal-600 dark:text-teal-400 font-bold text-4xl text-center lg:text-left container mx-auto my-5">
        Movies
      </h1>

      {/* Page Info */}
      <h1 className="text-zinc-800 dark:text-white text-center font-bold text-3xl container mx-auto my-8">
        Page <span className="text-teal-600 dark:text-teal-400 underline mx-2">{counter || 1}</span>
        From <span className="text-teal-600 dark:text-teal-400 underline mx-2">500</span>
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto justify-items-center">

        {movies?.map((movie, i) => (
          <div className="w-[19rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition relative" key={i}>

            {/* Heart Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(movie);
              }}
              className="absolute top-3 right-3 z-10 bg-white/60 dark:bg-black/60 hover:bg-white/80 dark:hover:bg-black/80 p-2 rounded-full transition-colors shadow-sm"
            >
              {isInWishlist(movie.id) ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-zinc-600 dark:text-white" />
              )}
            </button>

            {/* Image */}
            <img
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
              alt={movie.title}
              className="w-full  object-cover object-center"
            />

            {/* Body */}
            <div className="p-4 space-y-3">

              {/* Title */}
              <h2 className="font-bold text-zinc-900 dark:text-white text-lg">
                {movie.title}
              </h2>

              {/* Info Row */}
              <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                <span>⭐ {movie.vote_average}</span>
                <span>🔥 {movie.popularity.toFixed(0)}</span>
              </div>

              {/* Date + Language */}
              <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
                <span>📅 {movie.release_date}</span>
                <span>🌍 {movie.original_language}</span>
              </div>

              {/* Adult Badge */}
              {movie.adult && (
                <span className="inline-block text-xs bg-red-600 text-white px-2 py-1 rounded-md">
                  18+
                </span>
              )}

              {/* Overview */}
              <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                {movie.overview}
              </p>

              {/* Button */}
              <div className="flex justify-center pt-2">
                <button onClick={() => navigate(`/movies/${movie.id}`)} className="border border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 px-6 py-2 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-400 hover:text-white dark:hover:text-black transition">
                  Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
     
      {/* Pagination */}
      {showPagination && (
      <div className="flex items-center justify-center gap-4 py-10">

        {/* First Page Button */}
        <button
          disabled={counter === 1}
          onClick={() => setCounter(1)}
          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 transition"
        >
          <ChevronDoubleLeftIcon className="h-5 w-5 text-zinc-600 dark:text-white" />
        </button>

        {/* Previous Button */}
        <button
          disabled={counter === 1}
          onClick={() => setCounter((prev) => prev - 1)}
          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 text-zinc-600 dark:text-white" />
        </button>

        {/* Page Info */}
        <p className="text-zinc-800 dark:text-white">
          Page <span className="text-teal-600 dark:text-teal-400 font-bold">{counter || 1}</span>{" "}
          of <span className="text-teal-600 dark:text-teal-400 font-bold">500</span>
        </p>

        {/* Next Button */}
        <button
          disabled={counter === 500}
          onClick={() => setCounter((prev) => prev + 1)}
          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 transition"
        >
          <ArrowRightIcon className="h-5 w-5 text-zinc-600 dark:text-white" />
        </button>

        {/* Last Page Button */}
        <button
          disabled={counter === 500}
          onClick={() => setCounter(500)}
          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 transition"
        >
          <ChevronDoubleRightIcon className="h-5 w-5 text-zinc-600 dark:text-white" />
        </button>

            </div>
      )}
    </div>
  );
};