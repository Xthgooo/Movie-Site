"use client";

import { SubCategory } from "./SubCategory";
import { MovieInfo } from "../../components/GenresContext";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export type MovieCategorizerType = {
  title: string;
  hrefLink: string | null;
  moviesList: MovieInfo[];
  imageHeight: string;
  textHeight: string;
};

export const MovieCategorizer = ({
  title,
  hrefLink,
  moviesList,
  imageHeight,
  textHeight,
}: MovieCategorizerType) => {
  return (
    <div className="max-w-[1440px] w-full flex flex-col gap-8">
      <SubCategory title={title} hrefLink={hrefLink} loading={false} />
      <div className="w-full grid lg:grid-cols-5 lg:grid-rows-2 lg:gap-8 gap-5 md:grid-cols-4 md:grid-rows-2 grid-cols-2 grid-rows-5">
        {moviesList.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <MovieCard
              cover={movie.poster_path}
              rating={movie.vote_average}
              movieTitle={movie.title}
              imageHeight={imageHeight}
              textHeight={textHeight}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
