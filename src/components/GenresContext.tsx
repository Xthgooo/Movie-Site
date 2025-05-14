"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const myToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGQyZDU4OTUzZjVjN2ViNzI1ZGYwNTE2NzFjM2ZkNSIsIm5iZiI6MTc0MzQwNzAwNy43Mjk5OTk4LCJzdWIiOiI2N2VhNDc5ZjUwNDBhNzViNGFlNTY0M2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ORQP7lX7R0XI5ne0ybCMOzMq1t9-BPYVLnCxs9IUX84";

export type MovieInfo = {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export type Response = {
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};
type GenreResponse = {
  genres: Genre[];
};
type GenreContextType = {
  genres: Genre[];
};

export const GenreContext = createContext<GenreContextType>(
  {} as GenreContextType
);

export const GenreContextProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<GenreResponse>(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      setGenres(data.genres);
    };
    getMoviesByAxios();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};
