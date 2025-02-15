"use client";

import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/movie-card";

export default function MovieDetails() {
  const searchParams = useSearchParams();

  const movie = {
    title: decodeURIComponent(searchParams.get("title") || "Unknown Title"),
    year: decodeURIComponent(searchParams.get("year") || "N/A"),
    duration: decodeURIComponent(searchParams.get("duration") || "N/A"),
    rating: decodeURIComponent(searchParams.get("rating") || "N/A"),
    image: decodeURIComponent(searchParams.get("image") || "/placeholder.svg"),
    description: decodeURIComponent(searchParams.get("description") || "No description available."),
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center">
      <MovieCard {...movie} isHero />
    </main>
  );
}
