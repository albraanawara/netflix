import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import axios from "axios";

const AVATAR = "https://i.pravatar.cc/150?img=12";

export const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesSearch, setMoviesSearch] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


  const getSearchResults = async (query) => {
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
  <nav className="relative bg-zinc-950 text-white border-b border-zinc-800">

  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

    {/* Logo */}
    <div className="text-2xl font-bold text-teal-400">
      MovieApp
    </div>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center gap-3">
      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-800" to="/">
        Home
      </Link>

      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-800" to="/movies">
        Movies
      </Link>

      <Link className="px-3 py-1 rounded-lg hover:bg-zinc-800 flex items-center gap-1" to="/wishlist">
        Wishlist <span className="bg-teal-600 text-[10px] px-1.5 py-0.5 rounded-full">{wishlist.length}</span>
      </Link>
    </div>

    {/* Search (Desktop + Mobile) */}
    <div className="hidden md:block md:max-w-sm flex-1 mx-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-teal-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Auth */}
    <div className="hidden md:flex items-center gap-3">
      {user ? (
        <>
          <span className="text-sm text-zinc-300">Hi, {user.name}</span>
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
              <div className="absolute right-0 top-full mt-1 w-44 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setOpenDropdown(false)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-zinc-800 transition-colors text-sm"
                >
                  <span>👤</span> Profile
                </Link>
                <hr className="border-zinc-700" />
                <button
                  onClick={() => { handleLogout(); setOpenDropdown(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-zinc-800 transition-colors text-sm text-red-400"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link className="px-4 py-2 rounded-lg bg-teal-600" to="/login">
            Login
          </Link>

          <Link className="px-4 py-2 rounded-lg bg-teal-600" to="/register">
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
    <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">

      <Link onClick={() => setOpenMenu(false)} to="/">
        Home
      </Link>

      <Link onClick={() => setOpenMenu(false)} to="/movies">
        Movies
      </Link>

      <Link onClick={() => setOpenMenu(false)} to="/wishlist" className="flex justify-between items-center">
        <span>Wishlist</span>
        <span className="bg-teal-600 text-xs px-2 py-0.5 rounded-full">{wishlist.length}</span>
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {user ? (
        <>
          <Link
            onClick={() => setOpenMenu(false)}
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800"
          >
            <img src={AVATAR} alt="avatar" className="w-8 h-8 rounded-full border border-teal-500" />
            <span>{user.name}</span>
          </Link>
          <button
            onClick={() => { handleLogout(); setOpenMenu(false); }}
            className="w-full bg-red-600 hover:bg-red-500 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link onClick={() => setOpenMenu(false)} to="/login">
            Login
          </Link>

          <Link onClick={() => setOpenMenu(false)} to="/register">
            Register
          </Link>
        </>
      )}

    </div>
  )}


  <div className="relative w-full ">
     {moviesSearch?.length > 0 && searchTerm && (
    <div className="absolute left-1/2 z-50 mt-2 w-[250px] md:w-[320px] -translate-x-1/2 max-h-[400px] overflow-y-auto rounded-xl bg-[#1b1b1b] shadow-2xl">

      {moviesSearch.map((movie) => (
        <Link
          key={movie?.id}
          to={`/movies/${movie?.id}`}
          onClick={() => dispatch(aboutSearch())}
          className="flex items-center justify-between gap-3 p-3 transition-all duration-300 hover:bg-[#0DCAF0] hover:text-black group"
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