import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";


import { AuthContext } from "../../context/AuthContext";


export default function MainLayout(){


const { user, logout } = useContext(AuthContext);



return (

<div>


<nav

className="
flex
gap-5
p-5
border-b
items-center
"

>


<Link to="/">
Home
</Link>



<Link to="/movies">
Movies
</Link>




{
user && (

<Link to="/favorites">
Favorites ❤️
</Link>

)

}




<div className="ml-auto">


{
user ?


<button

onClick={logout}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Logout

</button>


:


<>

<Link 
className="mr-4"
to="/login"
>

Login

</Link>


<Link to="/register">

Register

</Link>


</>


}



</div>







</nav>




<div className="p-5">

<Outlet />

</div>



</div>


)

}