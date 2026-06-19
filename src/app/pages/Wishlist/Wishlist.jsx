import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";

export const Component = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-950 min-h-screen px-4 py-6 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-teal-400 font-bold text-4xl">
            My Wishlist ({wishlist.length})
          </h1>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900 rounded-3xl border border-zinc-800">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-zinc-400 mb-6 text-center max-w-md">
              Explore thousands of movies and add them to your wishlist to keep track of what you want to watch.
            </p>
            <Link
              to="/movies"
              className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-xl transition font-bold"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {wishlist.map((movie) => (
              <div
                key={movie.id}
                className="w-full max-w-[19rem] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Image */}
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={movie.poster_path 
                      ? `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
                      : "https://via.placeholder.com/220x330?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-[330px] object-cover object-center"
                  />
                </Link>

                {/* Body */}
                <div className="p-4 space-y-3">
                  {/* Title */}
                  <h2 className="font-bold text-white text-lg line-clamp-1">
                    {movie.title}
                  </h2>

                  {/* Info Row */}
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span>📅 {movie.release_date?.split("-")[0]}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => navigate(`/movies/${movie.id}`)}
                      className="flex-1 border border-teal-400 text-teal-400 py-2 rounded-lg hover:bg-teal-400 hover:text-black transition text-sm font-semibold"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => removeFromWishlist(movie.id)}
                      className="flex-1 bg-red-600/20 border border-red-600 text-red-500 py-2 rounded-lg hover:bg-red-600 hover:text-white transition text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
