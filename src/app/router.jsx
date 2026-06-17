import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";



const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const NotFound = lazy(
()=>import("../pages/404NotFound")
);

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <h2 className="text-3xl font-bold">
      Loading...
    </h2>
  </div>
);



export const router = createBrowserRouter([

  {
    path: "/",

    element: <MainLayout />,

    children: [

      {
        index: true,

        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },


      {
        path: "login",

        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },


      {
        path: "register",

        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },


      
      
    ],
  },


  {
 path:"*",

 element:

 <Suspense fallback={<Loading/>}>

 <NotFound/>

 </Suspense>
}

]);