import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function MovieCard({ title, year, duration, rating, image, isHero = false, description }) {
  if (isHero) {
    return (
      <div className="relative w-full min-h-screen flex items-end">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover z-0"
          priority={isHero}
        />

        {/* Black-to-transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/80 to-transparent w-full md:w-2/3 h-full z-[1]" />

        {/* Content container with backdrop blur that fades to the right */}
        <div className="relative z-[2] h-screen p-6 md:p-8 lg:p-12 w-full max-w-3xl flex flex-col justify-center self-end mt-auto 
        backdrop-blur-none before:absolute before:inset-0 before:bg-black/30 
        before:backdrop-blur-lg before:z-[-1]
        before:[-webkit-mask-image:linear-gradient(to_right,black,black,transparent)]
        before:[mask-image:linear-gradient(to_right,black,black,transparent)]">

          {/* Movie details */}
          <div className="flex gap-2 mb-10">
            {rating && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                IMDb {rating}
              </Badge>
            )}
            {year && <Badge variant="outline" className="text-white">{year}</Badge>}
            {duration && <Badge variant="outline" className="text-white">{duration}</Badge>}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          {description && <p className="text-white mb-6 max-w-xl text-justify">{description}</p>}
          <div className="flex gap-4">
            <Button variant="default">Watch trailer</Button>
            <Button variant="secondary">Watch now</Button>
          </div>
        </div>

        {/* Extra div to soften the blur effect at the far right */}
        <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-l from-transparent to-black/20 backdrop-blur-sm hidden md:block" />
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
