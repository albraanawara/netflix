import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages (no React.lazy needed anymore)
const Home = () => import("../pages/MovieAndDetails/Home");
const Movies = () => import("../pages/MovieAndDetails/Movies");
const MovieDetails = () => import("../pages/MovieAndDetails/MovieDetails");

const Login = () => import("../pages/Auth/Login");
const Register = () => import("../pages/Auth/Register");

const NotFound = () => import("../pages/Error Page/404NotFound");

// Loading UI
const Loading = () => import("../utils/Loading");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
     HydrateFallback: Loading,
    children: [
      {
        index: true,
        lazy: Home,
      },
      {
        path: "movies",
        lazy: Movies,
      },
      {
        path: "movies/:id",
        lazy: MovieDetails,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        lazy: Login,
      },
      {
        path: "register",
        lazy: Register,
      },
    ],
  },

  {
    path: "*",
    lazy: NotFound,
  },
]);