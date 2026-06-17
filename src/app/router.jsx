import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";


const Favorites = lazy(
()=>import("../pages/Favorites")
);
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Movies = lazy(() => import("../pages/Movies"));
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


      {
        path: "movies",

        element: (
          <Suspense fallback={<Loading />}>
            <Movies />
          </Suspense>
        ),
      },
        {
    path:"favorites",

   element:

(

<ProtectedRoute>

<Suspense fallback={<Loading/>}>

<Favorites/>

</Suspense>

</ProtectedRoute>

)

    }

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