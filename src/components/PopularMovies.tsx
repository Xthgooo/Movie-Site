"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { MovieInfo, myToken, Response } from "./GenresContext";

type PopularContextType = {
  popular: MovieInfo[];
  popularPageNUM: number;
  setPopularPageNUM: (page: number) => void;
  popularTotalPages: number;
  popularPageLoading: boolean;
};

export const PopularContext = createContext<PopularContextType>(
  {} as PopularContextType
);

export const PopularMovies = ({ children }: PropsWithChildren) => {
  const [popular, setPopular] = useState<MovieInfo[]>([]);
  const [popularPageNUM, setPopularPageNUM] = useState<number>(1);
  const [popularTotalPages, setPopularTotalPages] = useState<number>(0);
  const [popularPageLoading, setPopularPageLoading] = useState(false);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      setPopularPageLoading(true);
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${popularPageNUM}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      setPopular(data.results);
      setPopularTotalPages(data.total_pages);
      setPopularPageLoading(false);
    };

    getMoviesByAxios();
  }, [popularPageNUM]);

  return (
    <PopularContext.Provider
      value={{
        popular,
        popularPageNUM,
        setPopularPageNUM,
        popularTotalPages,
        popularPageLoading,
      }}
    >
      {children}
    </PopularContext.Provider>
  );
};
