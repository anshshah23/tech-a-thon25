import MovieCard from "./movie-card";
import MovieSlider from "./movie-slider";
import BgImage from "../../public/background1.jpg"

const heroMovie = {
  id: "spider-man",
  title: "Spider-Man: No Way Home",
  year: "2021",
  duration: "150 minutes",
  rating: "8.2",
  image: BgImage,
  description:
    "Suspendisse quis ultrices torquam ut. Mi a minima dicuntur metus eu felis, id ultrices diam ipsum amet. Ut metus eros ipsum amet impedit eu scelerisque ipsum.",
};

// Generate sample movie data
const marvelMovies = Array.from({ length: 10 }, (_, i) => ({
  id: `marvel-${i}`,
  title: `Marvel Movie ${i + 1}`,
  year: "2023",
  image: "/placeholder.svg?height=450&width=300",
}));

const dcMovies = Array.from({ length: 10 }, (_, i) => ({
  id: `dc-${i}`,
  title: `DC Movie ${i + 1}`,
  year: "2023",
  image: "/placeholder.svg?height=450&width=300",
}));

const Home = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative">
        <MovieCard {...heroMovie} isHero />
      </section>

      <section className="py-8 space-y-12">
        <MovieSlider title="Marvel Movies" movies={marvelMovies} />
        <MovieSlider title="DC Movies" movies={dcMovies} />
      </section>
    </main>
  );
};

export default Home;
