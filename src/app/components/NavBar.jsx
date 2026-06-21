import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const AVATAR = "https://i.pravatar.cc/150?img=12";

export const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesSearch, setMoviesSearch] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


  const getSearchResults = async () => {
    if (!searchTerm.trim()) {
      setMoviesSearch([]);
      return;
    }
    try {
      const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: { query: searchTerm, language: "en-US", page: 1 },
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsIm5iZiI6MTcxNDI5MzMxMS4yLCJzdWIiOiI2NjJlMGEzZjI0ZjJjZTAxMjYyYWFmNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ss1IcpVByzOGldtfb5cWiyf4F-D70wUFmmdA3ie6YLs",
        },
      });
      setMoviesSearch(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [searchTerm]);
  console.log(moviesSearch);
  return (
  <nav className="relative bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">

  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

    {/* Logo */}
    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
      MovieApp
    </div>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center gap-3">
      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800" to="/">
        Home
      </Link>

      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800" to="/movies">
        Movies
      </Link>

      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800" to="/search">
        Search
      </Link>

      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1" to="/wishlist">
        Wishlist <span className="bg-teal-600 text-[10px] px-1.5 py-0.5 rounded-full text-white">{wishlist.length}</span>
      </Link>
    </div>

    {/* Search (Desktop + Mobile) */}
    <div className="hidden md:block md:max-w-sm flex-1 mx-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:border-teal-500 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Auth & Theme Toggle */}
    <div className="hidden md:flex items-center gap-3">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {theme === "dark" ? (
          <SunIcon className="w-5 h-5 text-yellow-500" />
        ) : (
          <MoonIcon className="w-5 h-5 text-zinc-600" />
        )}
      </button>

      {user ? (
        <>
          <span className="text-sm text-zinc-600 dark:text-zinc-300">Hi, {user.name}</span>
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <img
              src={AVATAR}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-teal-500 hover:border-teal-300 transition-all"
            />
            {openDropdown && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setOpenDropdown(false)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm text-zinc-700 dark:text-zinc-200"
                >
                  <span>👤</span> Profile
                </Link>
                <hr className="border-zinc-200 dark:border-zinc-700" />
                <button
                  onClick={() => { handleLogout(); setOpenDropdown(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm text-red-500"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500" to="/login">
            Login
          </Link>

          <Link className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500" to="/register">
            Register
          </Link>
        </>
      )}
    </div>

    {/* Mobile Button */}
    <button
      onClick={() => setOpenMenu(!openMenu)}
      className="md:hidden text-2xl"
    >
      ☰
    </button>

  </div>
    {openMenu && (
    <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 space-y-3">

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-teal-600 dark:text-teal-400">Theme</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 transition-colors"
        >
          {theme === "dark" ? (
            <div className="flex items-center gap-2">
              <SunIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">Light</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MoonIcon className="w-5 h-5 text-zinc-600" />
              <span className="text-sm">Dark</span>
            </div>
          )}
        </button>
      </div>

      <Link onClick={() => setOpenMenu(false)} to="/" className="block py-2 hover:text-teal-500 transition-colors">
        Home
      </Link>

      <Link onClick={() => setOpenMenu(false)} to="/movies" className="block py-2 hover:text-teal-500 transition-colors">
        Movies
      </Link>

      <Link onClick={() => setOpenMenu(false)} to="/search" className="block py-2 hover:text-teal-500 transition-colors">
        Search
      </Link>

      <Link onClick={() => setOpenMenu(false)} to="/wishlist" className="flex justify-between items-center py-2 hover:text-teal-500 transition-colors">
        <span>Wishlist</span>
        <span className="bg-teal-600 text-xs px-2 py-0.5 rounded-full text-white">{wishlist.length}</span>
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {user ? (
        <>
          <Link
            onClick={() => setOpenMenu(false)}
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <img src={AVATAR} alt="avatar" className="w-8 h-8 rounded-full border border-teal-500" />
            <span>{user.name}</span>
          </Link>
          <button
            onClick={() => { handleLogout(); setOpenMenu(false); }}
            className="w-full bg-red-600 hover:bg-red-500 py-2 rounded-lg text-sm text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex gap-2 pt-2">
          <Link onClick={() => setOpenMenu(false)} to="/login" className="flex-1 text-center bg-teal-600 py-2 rounded-lg text-white">
            Login
          </Link>

          <Link onClick={() => setOpenMenu(false)} to="/register" className="flex-1 text-center bg-zinc-800 py-2 rounded-lg text-white">
            Register
          </Link>
        </div>
      )}

    </div>
  )}


  <div className="relative w-full ">
     {moviesSearch?.length > 0 && searchTerm && (
    <div className="absolute left-1/2 z-50 mt-2 w-[250px] md:w-[320px] -translate-x-1/2 max-h-[400px] overflow-y-auto rounded-xl bg-white dark:bg-[#1b1b1b] shadow-2xl border border-zinc-200 dark:border-zinc-800">

      {moviesSearch.map((movie) => (
        <Link
          key={movie?.id}
          to={`/movies/${movie?.id}`}
          className="flex items-center justify-between gap-3 p-3 transition-all duration-300 hover:bg-teal-50 dark:hover:bg-[#0DCAF0] hover:text-teal-600 dark:hover:text-black group"
        >

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">

            <img
              src={
                movie?.poster_path
                  && `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  
              }
              alt={movie?.title}
              className="h-12 w-12 rounded-lg object-cover shadow"
            />

            <div>
              <h2 className="text-sm font-semibold group-hover:text-black">
                {movie?.title}
              </h2>

              <p className="text-xs text-gray-400 group-hover:text-black">
                Movie
              </p>
            </div>

          </div>

          <span className="text-lg font-bold opacity-60 group-hover:opacity-100">
            →
          </span>

        </Link>
      ))}

    </div>
  )}

  </div>
</nav>
  );
};