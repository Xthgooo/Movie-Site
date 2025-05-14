"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { MovieInfo, myToken, Response } from "./GenresContext";

type TopRatedContextType = {
  topRated: MovieInfo[];
  topRatedPageNUM: number;
  setTopRatedPageNUM: (page: number) => void;
  topRatedTotalPages: number;
  topRatedPageLoading: boolean;
};

export const TopRatedContext = createContext<TopRatedContextType>(
  {} as TopRatedContextType
);

export const TopRatedMovies = ({ children }: PropsWithChildren) => {
  const [topRated, setTopRated] = useState<MovieInfo[]>([]);
  const [topRatedPageNUM, setTopRatedPageNUM] = useState<number>(1);
  const [topRatedTotalPages, setTopRatedTotalPages] = useState<number>(0);
  const [topRatedPageLoading, setTopRatedPageLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      setTopRatedPageLoading(true);
      try {
        const { data } = await axios.get<Response>(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${topRatedPageNUM}`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );
        setTopRated(data.results);
        setTopRatedTotalPages(data.total_pages);
        setTopRatedPageLoading(false);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    getMoviesByAxios();
  }, [topRatedPageNUM]);

  return (
    <TopRatedContext.Provider
      value={{
        topRated,
        topRatedPageNUM,
        setTopRatedPageNUM,
        topRatedTotalPages,
        topRatedPageLoading,
      }}
    >
      {children}
    </TopRatedContext.Provider>
  );
};
