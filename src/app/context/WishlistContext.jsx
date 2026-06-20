import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

// Helper to get localStorage key for current user
const getWishlistKey = (user) => {
  if (!user || !user.email) return null;
  return `wishlist_${user.email}`;
};

export default function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const key = getWishlistKey(user);
      if (!key) return [];
      const savedWishlist = localStorage.getItem(key);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });

  // Load wishlist when user changes (login/logout)
  useEffect(() => {
    try {
      const key = getWishlistKey(user);
      if (key) {
        const savedWishlist = localStorage.getItem(key);
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error loading wishlist for user change:", error);
      setWishlist([]);
    }
  }, [user]);

  // Save wishlist to user's localStorage key when wishlist or user changes
  useEffect(() => {
    const key = getWishlistKey(user);
    if (key) {
      localStorage.setItem(key, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (movie) => {
    if (!movie || !movie.id) return;
    
    const isAlreadyInWishlist = isInWishlist(movie.id);
    if (!isAlreadyInWishlist) {
      setWishlist((prev) => [...prev, movie]);
      toast.success(`${movie.title} added to wishlist`);
    }
  };

  const removeFromWishlist = (movieId) => {
    const movie = wishlist.find((item) => item.id === movieId);
    if (movie) {
      setWishlist((prev) => prev.filter((item) => item.id !== movieId));
      toast.success(`${movie.title} removed from wishlist`);
    }
  };

  const toggleWishlist = (movie) => {
    if (!movie || !movie.id) return;
    
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((item) => item.id === movieId);
  };

  const clearWishlist = () => {
    const key = getWishlistKey(user);
    if (wishlist.length > 0) {
      setWishlist([]);
      if (key) {
        localStorage.removeItem(key);
      }
      toast.success("Wishlist cleared");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
