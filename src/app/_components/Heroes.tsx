"use client";
import { useContext, useState } from "react";
import { HeroTemplate } from "./HeroTemplate";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieInfo } from "@/components/GenresContext";
import { TopRatedContext } from "@/components/TopRatedMovies";

export const Heroes = () => {
  const { topRated } = useContext(TopRatedContext);

  return (
    <Carousel
      opts={{ align: "center", loop: true }}
      className="max-w-[1440px] w-full h-[510px] lg:h-[600px] overflow-x-hidden mt-6 mb-12 relative flex items-center justify-center"
    >
      <CarouselContent>
        {topRated.slice(0, 5).map((movie: MovieInfo, index) => (
          <CarouselItem key={movie.id} className="heroes">
            <HeroTemplate
              cover={movie.backdrop_path}
              movieTitle={movie.title}
              rating={String(movie.vote_average)}
              summary={movie.overview}
              id={movie.id}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-[90%] absolute flex justify-between">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
