import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../services/tmdb";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((data) => {
        console.log(data);

        setMovies(data.results || []);
      })

      .catch((error) => {
        console.log(error);

        setMovies([]);
      });
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
