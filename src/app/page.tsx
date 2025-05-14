"use client";

import Image from "next/image";
import { Heroes } from "./_components/Heroes";
import { MovieCategorizer } from "./_components/MovieCategorizer";
import { useContext, useState } from "react";
import { UpcomingContext } from "@/components/UpcomingMovies";
import { PopularContext } from "@/components/PopularMovies";
import { TopRatedContext } from "@/components/TopRatedMovies";
import { SubCategory } from "./_components/SubCategory";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "react-responsive";

type Category = {
  name: "Upcoming" | "Popular" | "Top Rated";
  href: string;
};

const categories: Category[] = [
  { name: "Upcoming", href: "/upcoming/" },
  { name: "Popular", href: "/popular/" },
  { name: "Top Rated", href: "/topRated/" },
];

export default function Home() {
  const { upcoming, upcomingPageLoading } = useContext(UpcomingContext);
  const { popular, popularPageLoading } = useContext(PopularContext);
  const { topRated, topRatedPageLoading } = useContext(TopRatedContext);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="w-screen flex justify-center">
      <div className="max-w-[1440px] w-full flex flex-col items-center">
        <Heroes />
        <div className="max-w-[1440px] w-full flex flex-col items-center lg:gap-14 gap-8 px-5 lg:px-20 lg:mb-[19px] mb-8">
          {upcomingPageLoading || popularPageLoading || topRatedPageLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full flex flex-col gap-8">
                  <SubCategory title="" hrefLink={null} loading={true} />
                  <div className="max-w-[1440px] w-full lg:gap-8 gap-5 lg:grid-cols-5 lg:grid-rows-2 grid-cols-2 grid-rows-5">
                    {Array.from({ length: 10 }).map((_, skeletonIndex) => (
                      <Skeleton
                        key={skeletonIndex}
                        className="lg:w-[229px] lg:h-[439px] rounded-sm w-[158px] h-[233px]"
                      />
                    ))}
                  </div>
                </div>
              ))
            : categories.map(({ name, href }) => (
                <div className="max-w-[1440px] w-full" key={name}>
                  <MovieCategorizer
                    title={name}
                    hrefLink={href}
                    moviesList={
                      name === "Upcoming"
                        ? upcoming.slice(0, 10)
                        : name === "Popular"
                        ? popular.slice(0, 10)
                        : name === "Top Rated"
                        ? topRated.slice(0, 10)
                        : []
                    }
                    imageHeight={isLargeScreen ? "340px" : "233px"}
                    textHeight={isLargeScreen ? "95px" : "76px"}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
