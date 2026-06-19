import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    if (!movie || !movie.id) return;
    
    setWishlist((prev) => {
      if (prev.find((item) => item.id === movie.id)) {
        return prev;
      }
      toast.success(`${movie.title} added to wishlist`);
      return [...prev, movie];
    });
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => {
      const movie = prev.find((item) => item.id === movieId);
      if (movie) {
        toast.success(`${movie.title} removed from wishlist`);
      }
      return prev.filter((item) => item.id !== movieId);
    });
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
    setWishlist([]);
    localStorage.removeItem("wishlist");
    toast.success("Wishlist cleared");
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
