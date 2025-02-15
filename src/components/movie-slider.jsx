"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MovieSlider({ title = "Featured Movies", movies = [] }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sliderRef = useRef(null);
  const router = useRouter();

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    checkScroll();
    slider.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      slider.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollTo({
      left:
        direction === "left"
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const handleDetailsClick = (movie) => {
    router.push(
      `/movie-details?title=${encodeURIComponent(movie.title)}&year=${encodeURIComponent(movie.year)}&duration=${encodeURIComponent(movie.duration)}&rating=${encodeURIComponent(movie.rating)}&image=${encodeURIComponent(movie.image)}&description=${encodeURIComponent(movie.description)}`
    );
  };

  return (
    <div className="relative group mx-auto max-w-7xl">
      {title && <h2 className="text-2xl font-semibold mb-4 px-4 text-white">{title}</h2>}

      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 scroll-smooth"
          onScroll={checkScroll}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-shrink-0 w-[200px] h-[280px] rounded-lg shadow-lg overflow-hidden 
              transition-transform duration-300 hover:scale-110 hover:z-10 cursor-pointer"
            >
              {/* Movie Image */}
              <Image
                src={movie.image}
                alt={movie.title}
                width={200}
                height={280}
                className="object-cover w-full h-full"
              />

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 
                opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <p className="text-white text-lg font-semibold text-center">{movie.title}</p>
                <button
                  onClick={() => handleDetailsClick(movie)}
                  className="mt-2 px-4 py-1 text-white border border-white rounded-lg 
                  hover:bg-white hover:text-black transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 
            flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 
            flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieSlider;
