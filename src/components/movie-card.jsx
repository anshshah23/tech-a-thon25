import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function MovieCard({ title, year, duration, rating, image, isHero = false, description }) {
  if (isHero) {
    return (
      <div className="relative w-full min-h-screen flex items-end">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover z-0" priority={isHero} />
        
        {/* Adjusted Gradient: Black covers half width, fades out smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent w-1/2 h-full z-[1]" />

        {/* Reduced border-like definition by softening the background */}
        <div className="relative z-[2] p-6 md:p-8 lg:p-12 w-full max-w-3xl bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            {rating && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                IMDb {rating}
              </Badge>
            )}
            {year && <Badge variant="outline" className="text-white">{year}</Badge>}
            {duration && <Badge variant="outline" className="text-white">{duration}</Badge>}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          {description && <p className="text-white mb-6 max-w-xl">{description}</p>}
          <div className="flex gap-4">
            <Button variant="default">Watch trailer</Button>
            <Button variant="secondary">Watch now</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group cursor-pointer">
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-white font-semibold mb-2">{title}</h3>
          {year && <p className="text-gray-300 text-sm">{year}</p>}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
