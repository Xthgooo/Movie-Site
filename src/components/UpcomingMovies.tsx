"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { MovieInfo, myToken, Response } from "./GenresContext";

type UpcomingContextType = {
  upcoming: MovieInfo[];
  upComingPageNUM: number;
  setUpComingPageNUM: (page: number) => void;
  upcomingTotalPages: number;
  upcomingPageLoading: boolean;
};

export const UpcomingContext = createContext<UpcomingContextType>(
  {} as UpcomingContextType
);

export const UpcomingMovies = ({ children }: PropsWithChildren) => {
  const [upcoming, setUpcoming] = useState<MovieInfo[]>([]);
  const [upComingPageNUM, setUpComingPageNUM] = useState<number>(1);
  const [upcomingTotalPages, setUpcomingTotalPages] = useState<number>(0);
  const [upcomingPageLoading, setUpcomingPageLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      setUpcomingPageLoading(true);
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${upComingPageNUM}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      setUpcoming(data.results);
      setUpcomingTotalPages(data.total_pages);
      setUpcomingPageLoading(false);
    };

    getMoviesByAxios();
  }, [upComingPageNUM]);

  return (
    <UpcomingContext.Provider
      value={{
        upcoming,
        upComingPageNUM,
        setUpComingPageNUM,
        upcomingTotalPages,
        upcomingPageLoading,
      }}
    >
      {children}
    </UpcomingContext.Provider>
  );
};
