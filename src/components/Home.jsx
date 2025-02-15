"use client";

import MovieCard from "./movie-card";
import MovieSlider from "./movie-slider";
import BgImage from "../../public/background1.jpg";
import movieData from "../../public/movies_list.json"; // Ensure this path is correct

// Hero Movie (Featured Movie)
const heroMovie = {
  id: "spider-man",
  title: "Spider-Man: No Way Home",
  year: "2021",
  duration: "150 minutes",
  rating: "8.2",
  image: BgImage,
  description:
    "Spider-Man: No Way Home follows Peter Parker as he seeks help from Doctor Strange to make the world forget his identity, leading to a multiverse of challenges and the return of past villains.",
};

// Process movie data
const movies = movieData.map((movie, index) => ({
  id: `movie-${index}`,
  title: movie.movie_name,
  image: movie.movie_og_thumbnail_url,
  rating: movie.rating,
  year: movie.year || "N/A",
  duration: movie.duration || "N/A",
  description: movie.description || "No description available.",
})) || [];

const Home = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative">
        <MovieCard {...heroMovie} isHero />
      </section>

      {/* Movie Slider Section */}
      <section className="py-8 space-y-12">
        {movies.length > 0 ? (
          <MovieSlider title="Watched Movies" movies={movies} />
        ) : (
          <p className="text-center text-white">No movies available</p>
        )}
      </section>
    </main>
  );
};

export default Home;
