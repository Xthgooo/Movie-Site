"use client";
import { MovieInfo, myToken, Response } from "@/components/GenresContext";
import { ShowGenres } from "@/components/ShowGenres";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { HorizontalLine } from "../_assets/HorizontalLine";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";

const SearchByName = () => {
  const [suggests, setSuggests] = useState<MovieInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const searchParams = useSearchParams();
  const movieName = searchParams.get("movie");
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    const getMoviesByAxios = async () => {
      setLoading(true);
      if (movieName === "") return;
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&language=en-US&page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      setSuggests(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
      setLoading(false);
    };

    getMoviesByAxios();
  }, [movieName, pageNum]);

  return (
    <div className="w-screen flex justify-center ">
      <div className="w-320 flex flex-col gap-8">
        <h1 className="font-semibold text-[30px] h-9">Search filter</h1>
        <div className="flex gap-3 h-[826px]">
          <div className="overflow-y-scroll">
            <CategoryPageTemplate
              title={`${totalResults} results for "${movieName}"`}
              hrefLink={null}
              moviesList={suggests.slice(0, 8)}
              imageHeight="244px"
              textHeight="87px"
              totalPages={totalPages}
              pageNum={pageNum}
              setPageNum={setPageNum}
              loading={loading}
            />
          </div>
          <div className="w-[33px] flex justify-center">
            <HorizontalLine />
          </div>
          <div className="w-[387px]">
            <ShowGenres
              divWidth="w-[387px]"
              line={false}
              title="Search by genre"
              clickedGenre={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByName;
