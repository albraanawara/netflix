import { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../../components/HeroSlider";
import { Component as Movies } from "./Movies";


export const Component = () => {

const [movies,setMovies]=useState([]);


useEffect(()=>{

const getMovies=async()=>{

const response=await axios.get(
"https://api.themoviedb.org/3/movie/popular",
{
params:{
language:"en-US",
page:1
},
headers:{
accept:"application/json",
Authorization:"Bearer YOUR_TOKEN"
}
}
);


setMovies(response.data.results);

};


getMovies();

},[]);



return (

<div>

<HeroSlider movies={movies}/>


<Movies showPagination={false}/>


</div>

)

}