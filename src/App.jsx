import { RouterProvider } from "react-router-dom";
import { router } from "./app/Routes/router";
import { Loading } from "./app/utils/Loading";

function App() {
  return (
    <>
       <RouterProvider router={router} 
       fallbackElement={<Loading />} />


    </>
  );
}
export default App;
