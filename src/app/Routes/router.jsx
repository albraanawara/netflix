import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";

// Lazy load page components
const Home = () => import("../pages/MovieAndDetails/Home");
const Movies = () => import("../pages/MovieAndDetails/Movies");
const MovieDetails = () => import("../pages/MovieAndDetails/MovieDetails");
const Search = () => import("../pages/Search/Search");
const Wishlist = () => import("../pages/Wishlist/Wishlist");
const Login = () => import("../pages/Auth/Login");
const Register = () => import("../pages/Auth/Register");
const Profile = () => import("../pages/Profile/Profile");
const NotFound = async () => {
  const module = await import("../pages/Error Page/404NotFound");
  return { Component: module.default };
};

// Helper function to create protected lazy routes
function createProtectedLazyRoute(lazyLoader) {
  return {
    lazy: async () => {
      const module = await lazyLoader();
      return {
        Component: () => (
          <ProtectedRoute>
            <module.Component />
          </ProtectedRoute>
        ),
      };
    },
  };
}

// Helper function to create guest-only lazy routes
function createGuestLazyRoute(lazyLoader) {
  return {
    lazy: async () => {
      const module = await lazyLoader();
      return {
        Component: () => (
          <GuestRoute>
            <module.Component />
          </GuestRoute>
        ),
      };
    },
  };
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: Movies,
      },
      {
        path: "movies",
        lazy: Movies,
      },
      {
        path: "movies/:id",
        lazy: MovieDetails,
      },
      {
        path: "search",
        lazy: Search,
      },
      {
        path: "wishlist",
        ...createProtectedLazyRoute(Wishlist),
      },
      {
        path: "profile",
        ...createProtectedLazyRoute(Profile),
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        ...createGuestLazyRoute(Login),
      },
      {
        path: "register",
        ...createGuestLazyRoute(Register),
      },
    ],
  },

  {
    path: "*",
    lazy: NotFound,
  },
]);
