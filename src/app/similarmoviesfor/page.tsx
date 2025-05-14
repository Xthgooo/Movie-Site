"use client";

import { useEffect, useState } from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import { useSearchParams } from "next/navigation";
import { MovieInfo, myToken, Response } from "@/components/GenresContext";
import axios from "axios";

const SimilarMovies = () => {
  const [similar, setSimilar] = useState<MovieInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const searchParams = useSearchParams();
  const movieID = searchParams.get("movie");

  useEffect(() => {
    const getSimilarMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Response>(
          `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=${pageNum}`,
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );
        setSimilar(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie creators info:", error);
      }
    };

    getSimilarMovies();
  }, [movieID, pageNum]);

  return (
    <div className="w-screen flex justify-center ">
      <CategoryPageTemplate
        title="More like this"
        hrefLink={null}
        moviesList={similar}
        totalPages={totalPages}
        pageNum={pageNum}
        setPageNum={setPageNum}
        imageHeight="340px"
        textHeight="95px"
        loading={loading}
      />
    </div>
  );
};

export default SimilarMovies;
