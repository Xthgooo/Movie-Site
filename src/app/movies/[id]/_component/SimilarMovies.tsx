"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { SubCategory } from "@/app/_components/SubCategory";
import { MovieInfo, myToken, Response } from "@/components/GenresContext";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const SimilarMovies = ({ id }: { id: string }) => {
  const [similar, setSimilar] = useState<MovieInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isLarge = useMediaQuery({ minWidth: 1024 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const sliceCount = isLarge ? 5 : isMedium ? 8 : 10;

  useEffect(() => {
    const getSimilarMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Response>(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );
        setSimilar(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie creators info:", error);
      } finally {
        setLoading(false);
      }
    };
    getSimilarMovies();
  }, [id]);
  console.log(similar);

  return (
    <div className="max-w-[1440px] w-full flex flex-col gap-8 ">
      <SubCategory
        title="More like this"
        hrefLink={`/similarmoviesfor?movie=${id}`}
        loading={loading}
      />
      <div className="w-full lg:h-[372px] grid gap-5 lg:gap-8 lg:grid-cols-5 lg:grid-rows-1 md:grid-cols-4 md:grid-rows-2 grid-cols-2 grid-rows-5 z-50 ">
        {similar.slice(0, sliceCount).map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <MovieCard
              cover={movie.poster_path}
              rating={movie.vote_average}
              movieTitle={movie.title}
              imageHeight="281px"
              textHeight="87px"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
