import axios from "axios";
import { useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";

export const loader = async ({ params }) => {
  const { id } = params;

  const [movieDetailsResponse, castAndCrewResponse, videosResponse] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsIm5iZiI6MTcxNDI5MzMxMS4yLCJzdWIiOiI2NjJlMGEzZjI0ZjJjZTAxMjYyYWFmNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ss1IcpVByzOGldtfb5cWiyf4F-D70wUFmmdA3ie6YLs",
      },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsIm5iZiI6MTcxNDI5MzMxMS4yLCJzdWIiOiI2NjJlMGEzZjI0ZjJjZTAxMjYyYWFmNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ss1IcpVByzOGldtfb5cWiyf4F-D70wUFmmdA3ie6YLs",
      },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY4NjZkMTkzMGZkYjc5OTc4MWMzNjAzZmM0ZTJkYyIsIm5iZiI6MTcxNDI5MzMxMS4yLCJzdWIiOiI2NjJlMGEzZjI0ZjJjZTAxMjYyYWFmNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ss1IcpVByzOGldtfb5cWiyf4F-D70wUFmmdA3ie6YLs",
      },
    }),
  ]);
  return {
    movieDetails: movieDetailsResponse.data,
    castAndCrewData: castAndCrewResponse.data,
    videosData: videosResponse.data,
  };
}







export const Component = () => {
  const { movieDetails, castAndCrewData, videosData } = useLoaderData();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const cast = castAndCrewData.cast;
  const crew = castAndCrewData.crew;
  const [openTrailer, setOpenTrailer] = useState(false);
  const [trailer, setTrailer] = useState(
    videosData.results.find((video) => video.type === "Trailer" && video.site === "YouTube")
  );
  const navigate = useNavigate();
  console.log(videosData);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors">

      {/* HERO */}
      <section
        className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-4 text-center">
          <div>

            <h1 className="mb-4 text-3xl font-bold text-teal-600 dark:text-teal-400 md:text-5xl">
              {movieDetails.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-2 text-zinc-300">

              <span>{movieDetails.release_date}</span>

              <span>•</span>

              <span>{movieDetails.original_language}</span>

              <span>•</span>

              <span>{movieDetails.runtime} min</span>

            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-10">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* LEFT */}
          <aside className="lg:col-span-4 xl:col-span-3">

            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="mx-auto w-full max-w-sm rounded-3xl shadow-2xl"
            />

            <div className="mt-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 text-center">

              <p className="text-zinc-500 dark:text-zinc-400">
                Rating
              </p>

              <h2 className="mt-2 text-4xl font-bold text-yellow-600 dark:text-yellow-500">
                {movieDetails.vote_average?.toFixed(1)}
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400">
                {movieDetails.vote_count} votes
              </p>

            </div>

          </aside>

          {/* RIGHT */}
          <main className="space-y-8 lg:col-span-8 xl:col-span-9">

            {/* OVERVIEW */}
            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">

              <h2 className="mb-4 text-2xl font-bold text-teal-600 dark:text-teal-400">
                Overview
              </h2>

              <p className="leading-8 text-zinc-700 dark:text-zinc-300">
                {movieDetails.overview}
              </p>

            </div>

            {/* CAST */}
            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">

              <h2 className="mb-5 text-2xl font-bold text-teal-600 dark:text-teal-400">
                Cast
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                {castAndCrewData?.cast?.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="overflow-hidden rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
                  >

                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={actor.name}
                      className="h-[220px] w-full object-cover"
                    />

                    <div className="p-3 text-center">

                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {actor.name}
                      </p>

                      <p className="text-xs text-yellow-600 dark:text-yellow-500">
                        Acting
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* CREW */}
            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">

              <h2 className="mb-5 text-2xl font-bold text-teal-600 dark:text-teal-400">
                Crew
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {castAndCrewData?.crew?.slice(0, 9).map((member) => (
                  <div
                    key={member.credit_id}
                    className="rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm"
                  >

                    <p className="font-bold text-zinc-900 dark:text-white">
                      {member.name}
                    </p>

                    <p className="mt-1 text-yellow-600 dark:text-yellow-500">
                      {member.job}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">

              <button
                onClick={() => toggleWishlist(movieDetails)}
                className={`rounded-lg px-5 py-3 font-semibold text-white transition ${
                  isInWishlist(movieDetails.id)
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-teal-600 hover:bg-teal-500"
                }`}
              >
                {isInWishlist(movieDetails.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>

              <button
                onClick={() => setOpenTrailer(true)}
                className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500 shadow-md"
              >
                ▶ Play Trailer
              </button>

            </div>

            {/* BACK */}
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/movies");
                }
              }}
              className="rounded-lg border border-teal-600 dark:border-teal-400 px-6 py-3 text-teal-600 dark:text-teal-400 font-semibold transition hover:bg-teal-600 dark:hover:bg-teal-400 hover:text-white dark:hover:text-black"
            >
              Back
            </button>

          </main>

        </div>

      </section>


      {
        openTrailer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">

            <div className="relative w-full max-w-5xl">

              {/* Close Button */}
              <button
                onClick={() => setOpenTrailer(false)}
                className="absolute -top-12 right-0 text-3xl font-bold text-white"
              >
                ✕
              </button>

              {/* Video */}
              <div className="aspect-video overflow-hidden rounded-2xl">

                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`} title="Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}