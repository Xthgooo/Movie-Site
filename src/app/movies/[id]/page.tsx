"use client";

import { SmallArrowToRight } from "@/app/_assets/SmallArrowToRight";
import { SubCategory } from "@/app/_components/SubCategory";
import { MovieInfo, myToken, Response } from "@/components/GenresContext";
import { CreatersList } from "@/components/MovCreatersList";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SimilarMovies } from "./_component/SimilarMovies";
import { PlayTrailer } from "./_component/PlayTrailerButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Line } from "@/app/_assets/DividerLine";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMediaQuery } from "react-responsive";

type Cast = {
  name: string;
  popularity: number;
};

type Crew = {
  job: "Producer" | "Writer";
  name: string[];
};

type CreatorsInfoType = {
  crew: {
    job: "Producer" | "Writer";
    name: string;
  }[];
  cast: Cast[];
};
export type Params = {
  id: string;
};
type Genre = {
  name: string;
  id: number;
};
type OnlyThisMovInfos = {
  backdrop_path: string;
  genres: Genre[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};
export type Video = {
  key: string;
  type: string;
};
export type TrailerInfo = {
  id: number;
  results: Video[];
};

const MovieDisplayTemplate = () => {
  const [crewInfo, setCrewInfo] = useState<Record<string, string[]>>({});
  const [castInfo, setCastInfo] = useState<Cast[]>([]);
  const [movie, setMovie] = useState<OnlyThisMovInfos>();
  const [trailer, setTrailer] = useState<TrailerInfo>();
  const { id: paramID } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(false);
  const isLarge = useMediaQuery({ minWidth: 1024 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const sliceCount = isLarge ? 5 : isMedium ? 8 : 10;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const { data } = await axios.get<OnlyThisMovInfos>(
          `https://api.themoviedb.org/3/movie/${paramID}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovie();
  }, [paramID]);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${paramID}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );

        const trailerData = data.results.find(
          (video: Video) => video.type === "Trailer"
        );
        if (trailerData) {
          setTrailer(trailerData.key);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getTrailer();
  }, [paramID]);

  useEffect(() => {
    const getMoviesCreatorsInfo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<CreatorsInfoType>(
          `https://api.themoviedb.org/3/movie/${paramID}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );

        const groupedCrew = data.crew.reduce((acc, crewMember) => {
          if (crewMember.job === "Producer" || crewMember.job === "Writer") {
            if (!acc[crewMember.job]) {
              acc[crewMember.job] = [];
            }
            acc[crewMember.job].push(crewMember.name);
          }
          return acc;
        }, {} as Record<string, string[]>);

        const filteredCast = data.cast.filter(
          (castInfo) => castInfo.popularity > 2
        );

        setCrewInfo(groupedCrew);
        setCastInfo(filteredCast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie creators info:", error);
      }
    };

    getMoviesCreatorsInfo();
  }, [paramID]);

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  return (
    <div className="w-screen flex justify-center pt-8 lg:pt-0 ">
      <div className="max-w-[1440px] w-full flex flex-col gap-8 lg:mb-[112px] mb-8 ">
        <div className="w-full h-18 flex justify-between items-center lg:px-20 px-5">
          <div className="flex flex-col gap-1">
            {movie ? (
              <>
                <h1 className="lg:text-4xl lg:font-bold text-2xl font-semibold">
                  {movie.title}
                </h1>
                <p className="lg:text-lg text-[14px]">
                  {movie.release_date} · PG · 1h 50m
                </p>
              </>
            ) : (
              <>
                <Skeleton className="w-[211px] h-10 rounded-full" />
                <Skeleton className="w-[237px] h-7 rounded-full" />
              </>
            )}
          </div>
          <div className="w-21 h-16 flex flex-col justify-center">
            <p className="text-xs text-[#71717A]">
              Rating: {movie?.vote_count ? formatNumber(movie.vote_count) : ""}
            </p>
            {movie ? (
              <>
                <Rating
                  rating={
                    movie.vote_average ? movie.vote_average.toFixed(1) : "0"
                  }
                  starWidth="23px"
                  starHeight="22px"
                  black={true}
                  fontsize={isLarge ? "18px" : "14px"}
                />
              </>
            ) : (
              <div className="flex flex-col gap-2 w-[83px] ">
                <Skeleton className="w-full h-5 rounded-full" />
                <Skeleton className="w-full h-5 rounded-full" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:h-107 md:h-[350px] lg:flex h-[211px] gap-8 lg:px-20">
          {movie ? (
            <>
              <img
                className="hidden lg:flex max-w-[290px] h-full bg-cover"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
              <div className="w-full h-full relative">
                <img
                  className="w-full h-full lg:rounded-sm"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
                <Dialog>
                  <DialogTrigger className="absolute z-10 lg:top-[85%] md:top-[80%]  top-[70%] left-[4%] hover:underline text-white hover:opacity-85">
                    <PlayTrailer videoDuration="2:35" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle></DialogTitle>

                    {loading ? (
                      <Skeleton className="w-full h-full absolute rounded-lg" />
                    ) : (
                      <iframe
                        className="w-full h-full absolute rounded-lg"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="flex lg:hidden w-full h-full bg-cover" />
              <Skeleton className="lg:flex hidden w-[290px] h-full rounded-sm" />
              <Skeleton className="lg:flex hidden w-190 h-full rounded-sm" />
            </>
          )}
        </div>
        <div className="w-full flex flex-col lg:gap-5 lg:px-20 px-5 gap-[34px]">
          <div className="w-full flex lg:hidden gap-[34px]">
            {movie ? (
              <img
                className=" w-25 h-37 bg-cover lg:rounded-sm"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            ) : (
              <Skeleton className="w-25 h-37 bg-cover lg:rounded-sm" />
            )}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-3">
                {movie?.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/searchbygenre?genre=${genre.id}`}
                  >
                    <Button
                      key={genre.id}
                      className="h-5 text-[12px] font-semibold"
                    >
                      {genre.name}
                      <SmallArrowToRight white={false} />
                    </Button>
                  </Link>
                )) ?? []}
              </div>
              {movie ? (
                <p className="w-full text-base ">{movie.overview}</p>
              ) : (
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-full h-5 rounded-full" />
                  <Skeleton className="w-[90%] h-5 rounded-full" />
                  <Skeleton className="w-[80%] h-5 rounded-full" />
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-full hidden w-100 lg:flex gap-3 lg:gap-3 z-50 flex-wrap">
            {movie?.genres.map((genre) => (
              <Link key={genre.id} href={`/searchbygenre?genre=${genre.id}`}>
                <Button
                  key={genre.id}
                  className="h-5 text-[12px] font-semibold"
                >
                  {genre.name}
                  <SmallArrowToRight white={false} />
                </Button>
              </Link>
            )) ?? []}
          </div>
          {movie ? (
            <p className="w-full text-base hidden lg:flex">{movie.overview}</p>
          ) : (
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="w-full h-[22px] rounded-full" />
              <Skeleton className="w-full h-[22px] rounded-full" />
            </div>
          )}
          <div className="w-full flex flex-col gap-5">
            {loading ? (
              <>
                <div className="w-full h-10 gap-1 flex flex-col">
                  <div className="flex gap-13">
                    <Skeleton className="w-16 h-7 rounded-full" />
                    <Skeleton className="w-34 h-7 rounded-full" />
                  </div>
                  <Line />
                </div>
                <div className="w-full h-10 gap-1 flex flex-col">
                  <div className="flex gap-13">
                    <Skeleton className="w-16 h-7 rounded-full" />
                    <Skeleton className="w-34 h-7 rounded-full" />
                  </div>
                  <Line />
                </div>
                <div className="w-full h-10 gap-1 flex flex-col">
                  <div className="flex gap-13">
                    <Skeleton className="w-16 h-7 rounded-full" />
                    <Skeleton className="w-34 h-7 rounded-full" />
                  </div>
                  <Line />
                </div>
              </>
            ) : (
              <>
                {Object.keys(crewInfo).map((jobTitle, i) => (
                  <CreatersList
                    key={i}
                    role={jobTitle}
                    names={crewInfo[jobTitle]}
                  />
                ))}
                {castInfo.length > 0 && (
                  <CreatersList
                    role="Stars"
                    names={castInfo.map((actor) => actor.name)}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="lg:px-20 flex px-5 flex-col gap-8 ">
          {loading ? (
            <>
              <SubCategory title="" hrefLink={null} loading={true} />
              <div className="w-full lg:h-[372px] grid gap-5 lg:gap-8 lg:grid-cols-5 lg:grid-rows-1 md:grid-cols-4 md:grid-rows-2 grid-cols-2 grid-rows-5 z-50 ">
                {Array.from({ length: sliceCount }).map((_, idx) => (
                  <Skeleton key={idx} className="w-full h-[372px] rounded-sm" />
                ))}
              </div>
            </>
          ) : (
            <SimilarMovies id={paramID} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDisplayTemplate;
