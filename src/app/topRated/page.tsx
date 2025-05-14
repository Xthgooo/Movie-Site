"use client";

import { useContext } from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import { TopRatedContext } from "@/components/TopRatedMovies";

export default function TopRatedPage() {
  const {
    topRated,
    topRatedTotalPages,
    topRatedPageNUM,
    setTopRatedPageNUM,
    topRatedPageLoading,
  } = useContext(TopRatedContext);

  return (
    <div className="w-screen flex justify-center ">
      <CategoryPageTemplate
        title="Top Rated"
        hrefLink={null}
        moviesList={topRated}
        totalPages={topRatedTotalPages}
        pageNum={topRatedPageNUM}
        setPageNum={setTopRatedPageNUM}
        imageHeight="340px"
        textHeight="95px"
        loading={topRatedPageLoading}
      />
    </div>
  );
}
