"use client";
import { useParams, useSearchParams } from "next/navigation";
import { HorizontalLine } from "../_assets/HorizontalLine";
import {
  Genre,
  GenreContext,
  MovieInfo,
  myToken,
} from "@/components/GenresContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import Link from "next/link";

import { SmallArrowToRight } from "../_assets/SmallArrowToRight";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "react-responsive";
import { ShowMoviesByGenreTemplate } from "./_component/ShowMoviesByGenre";

const SearchByGenre = () => {
  const [movies, setMovies] = useState<MovieInfo[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const { genres } = useContext(GenreContext);
  const searchParams = useSearchParams();
  const genreID = searchParams.get("genre");
  const [loading, setLoading] = useState<boolean>(false);
  const isLarge = useMediaQuery({ minWidth: 1024 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const sliceCount = isLarge ? 10 : isMedium ? 8 : 10;

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreID}&page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
      setLoading(false);
    };

    getMovies();
  }, [genreID, pageNum]);
  const genreName = genres.find((genre) => genre.id === Number(genreID));

  return (
    <div className="w-screen flex justify-center lg:px:20 px-5">
      <div className="max-w-[1440px] w-full flex flex-col gap-8">
        <h1 className="font-semibold text-[24px] lg:text-[30px] h-8 lg:h-9">
          Search filter
        </h1>
        <div className="flex lg:flex-row lg:gap-7 flex-col gap-8 lg:h-[826px]">
          <div className="lg:w-[387px] w-full">
            <div className="w-full flex flex-col">
              <h3 className="text-[24px] font-semibold hidden lg:flex">
                Genre
              </h3>
              <h3 className="lg:text-[20px] text-[16px] font-semibold flex lg:hidden">
                Search by genre
              </h3>
              <p className="text-[16px] mt-1">See lists of movies by genre</p>
              <div className="h-[33px] flex items-center"></div>
              <div className="flex gap-4 flex-wrap">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/searchbygenre?genre=${genre.id}`}
                  >
                    <Badge
                      variant={
                        genreID === String(genre.id) ? "default" : "outline"
                      }
                      className="flex  items-center gap-2"
                    >
                      {genre.name}
                      <SmallArrowToRight white={genreID === String(genre.id)} />
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {isLarge && <HorizontalLine />}
          <div className="max-w-[900px] w-full overflow-y-scroll">
            <ShowMoviesByGenreTemplate
              title={`${totalResults} titles in "${genreName?.name}"`}
              hrefLink={null}
              moviesList={movies.slice(0, sliceCount)}
              imageHeight="244px"
              textHeight="87px"
              totalPages={totalPages}
              pageNum={pageNum}
              setPageNum={setPageNum}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByGenre;
