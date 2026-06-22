import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider({ movies }) {

  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="h-[500px]"
    >

      {movies?.slice(0,5).map((movie) => (

        <SwiperSlide key={movie.id}>

          <div className="relative h-[500px]">

            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />


            <div className="absolute inset-0 bg-black/60 flex items-center">

              <div className="container mx-auto px-10 text-white">

                <h2 className="text-5xl font-bold mb-4">
                  {movie.title}
                </h2>


                <p className="max-w-2xl line-clamp-3">
                  {movie.overview}
                </p>


                <button
                  onClick={() => navigate(`/movies/${movie.id}`)}
                  className="mt-5 px-6 py-3 bg-teal-500 rounded-lg hover:bg-teal-600"
                >
                  Watch Details
                </button>


              </div>

            </div>

          </div>


        </SwiperSlide>

      ))}

    </Swiper>
  );
}