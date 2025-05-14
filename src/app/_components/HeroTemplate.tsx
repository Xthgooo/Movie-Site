"use client";
import { PlayTriangle } from "../_assets/PlayTriange";
import { Rating } from "@/components/Rating";
import { useEffect, useState } from "react";
import { myToken } from "@/components/GenresContext";
import axios from "axios";
import { TrailerInfo, Video } from "../movies/[id]/page";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

type HeroContentType = {
  cover: string;
  movieTitle: string;
  rating: string;
  summary: string;
  id: number;
};

export const HeroTemplate = ({
  cover,
  movieTitle,
  rating,
  summary,
  id,
}: HeroContentType) => {
  const [trailer, setTrailer] = useState<TrailerInfo>();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
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
  }, [id]);

  return (
    <div className="max-w-[1440px] w-full h-[510px] lg:h-[600px] lg:relative">
      <img
        className="w-full lg:h-[600px] h-66 lg:bg-cover"
        src={`https://image.tmdb.org/t/p/w500${cover}`}
      />
      <div className="lg:absolute lg:top-[178px] lg:left-[140px] lg:items-start h-66 w-full h-items-center p-5 flex flex-col gap-4">
        <div className="flex lg:flex-col justify-between lg:text-white">
          <div className="flex flex-col">
            <p className="lg:text-[16px] text-[14px]">Now Playing:</p>
            <Link href={`/movies/${id}`}>
              <p className="lg:text-4xl lg:font-bold text-2xl font-semibold">
                {movieTitle}
              </p>
            </Link>
          </div>

          <Rating
            rating={Number(rating).toFixed(1)}
            starWidth="23px"
            starHeight="22px"
            black={!isLargeScreen}
            fontsize="18px"
          />
        </div>
        <p
          className="lg:w-[302px] lg:text-white h-25 lg:h-fit"
          style={{ fontSize: "12px" }}
        >
          {summary}
        </p>

        <Dialog>
          <DialogTrigger>
            <div className="lg:bg-white bg-black shadow-xs w-[145px] h-10 flex justify-center items-center rounded-[6px] gap-2 hover:opacity-70 ">
              <PlayTriangle white={!isLargeScreen} />
              <p className="lg:text-black text-white">Watch Trailer</p>
            </div>
          </DialogTrigger>
          <div className="w-screen h-screen flex justify-center items-center z-90">
            <DialogContent>
              <iframe
                className="w-full h-full absolute rounded-lg"
                src={`https://www.youtube.com/embed/${trailer}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
