"use client";
import { useContext, useEffect, useState } from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

import { PopularContext } from "@/components/PopularMovies";

export default function PopularPage() {
  const {
    popular,
    popularPageNUM,
    popularTotalPages,
    setPopularPageNUM,
    popularPageLoading,
  } = useContext(PopularContext);
  return (
    <div className="w-full flex justify-center">
      <CategoryPageTemplate
        title="Popular"
        hrefLink={null}
        moviesList={popular}
        pageNum={popularPageNUM}
        totalPages={popularTotalPages}
        setPageNum={setPopularPageNUM}
        imageHeight="340px"
        textHeight="95px"
        loading={popularPageLoading}
      />
    </div>
  );
}
