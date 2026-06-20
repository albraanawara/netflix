import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../utils/Loading";
import { WishlistContext } from "../../context/WishlistContext";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsIm5iZiI6MTcxNDI5MzMxMS4yLCJzdWIiOiI2NjJlMGEzZjI0ZjJjZTAxMjYyYWFmNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ss1IcpVByzOGldtfb5cWiyf4F-D70wUFmmdA3ie6YLs";

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Rating", value: "vote_average" },
  { label: "Release Date", value: "release_date" },
];

export const Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  const [loading, setLoading] = useState(!!initialQuery);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  // 500ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Sync URL with debounced query
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ query: debouncedQuery }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debouncedQuery, setSearchParams]);

  // Fetch genres once on mount
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: { language: "en-US" },
        headers: { accept: "application/json", Authorization: API_TOKEN },
      })
      .then((res) => setGenres(res.data.genres))
      .catch(console.error);
  }, []);

  // Main fetch: runs when query OR genre changes
  // - genre only  → /discover/movie?with_genres=   (server-side filter)
  // - query only  → /search/movie                   (all results)
  // - query+genre → /search/movie + client-side filter
  // - neither     → clear results, show initial state
  useEffect(() => {
    if (!debouncedQuery && !selectedGenre) {
      setMovies([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setHasSearched(true);

    const doFetch = async () => {
      try {
        let url, params;

        if (debouncedQuery) {
          url = "https://api.themoviedb.org/3/search/movie";
          params = { query: debouncedQuery, language: "en-US", page: 1 };
        } else {
          // Genre selected, no text query → use discover
          url = "https://api.themoviedb.org/3/discover/movie";
          params = {
            with_genres: selectedGenre,
            language: "en-US",
            page: 1,
            sort_by: "popularity.desc",
          };
        }

        const res = await axios.get(url, {
          params,
          headers: { accept: "application/json", Authorization: API_TOKEN },
          signal: controller.signal,
        });
        setMovies(res.data.results);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Fetch error:", err);
          setMovies([]);
        }
      } finally {
        setLoading(false);
      }
    };

    doFetch();
    return () => controller.abort();
  }, [debouncedQuery, selectedGenre]);

  // Client-side genre filter only when both query AND genre are active
  // (discover already filters server-side when there's no query)
  const filteredMovies =
    debouncedQuery && selectedGenre
      ? movies.filter((m) => m.genre_ids?.includes(selectedGenre))
      : movies;

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "popularity") return b.popularity - a.popularity;
    if (sortBy === "vote_average") return b.vote_average - a.vote_average;
    if (sortBy === "release_date")
      return new Date(b.release_date || 0) - new Date(a.release_date || 0);
    return 0;
  });

  const triggerSearch = () => setDebouncedQuery(inputValue.trim());

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* Search Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-teal-400 mb-1">Movie Search</h1>
          <p className="text-zinc-400 text-sm">Discover any movie from the TMDB database</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
            placeholder="Search for a movie..."
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-teal-500 focus:outline-none text-white placeholder-zinc-500 text-base"
            autoFocus
          />
          <button
            onClick={triggerSearch}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-semibold transition-colors"
          >
            Search
          </button>
        </div>

        {/* Filters Panel — always visible */}
        {genres.length > 0 && (
          <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-3">
              Filter by Genre
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGenre(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === null
                    ? "bg-teal-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGenre(selectedGenre === g.id ? null : g.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedGenre === g.id
                      ? "bg-teal-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort Controls — always visible */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
            Sort by
          </p>
          <div className="flex gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === opt.value
                    ? "bg-teal-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {hasSearched && !loading && (
          <p className="text-zinc-500 text-sm mb-6">
            {sortedMovies.length === 0
              ? "No movies found"
              : `${sortedMovies.length} movie${sortedMovies.length !== 1 ? "s" : ""} found`}
          </p>
        )}

        {/* Content Area */}
        {loading ? (
          <Loading />
        ) : sortedMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform relative"
              >
                <button
                  onClick={() => toggleWishlist(movie)}
                  className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition-colors"
                >
                  {isInWishlist(movie.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-white" />
                  )}
                </button>

                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://placehold.co/300x450/27272a/71717a?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover object-top"
                />

                <div className="p-4 space-y-2">
                  <h2 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                    {movie.title}
                  </h2>
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span>📅 {movie.release_date?.slice(0, 4) || "—"}</span>
                  </div>
                  <p className="text-zinc-500 text-xs line-clamp-2">{movie.overview}</p>
                  <button
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    className="w-full mt-1 border border-teal-400 text-teal-400 py-1.5 rounded-lg hover:bg-teal-400 hover:text-black text-sm transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-6xl mb-4">🎬</p>
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">No movies found</h2>
            <p className="text-zinc-500">Try a different search term or remove the genre filter.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-6xl mb-4">🔍</p>
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">Search for movies</h2>
            <p className="text-zinc-500">Type a movie name or pick a genre above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
