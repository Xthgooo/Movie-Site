"use client";
import { useContext, useEffect, useState } from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import { MovieInfo, myToken, Response } from "../../components/GenresContext";
import axios from "axios";
import { UpcomingContext } from "@/components/UpcomingMovies";

export default function UpcomingPage() {
  const {
    upcoming,
    upcomingTotalPages,
    upComingPageNUM,
    setUpComingPageNUM,
    upcomingPageLoading,
  } = useContext(UpcomingContext);

  return (
    <div className="w-screen flex justify-center">
      <CategoryPageTemplate
        title="Upcoming"
        hrefLink={null}
        moviesList={upcoming}
        totalPages={upcomingTotalPages}
        pageNum={upComingPageNUM}
        setPageNum={setUpComingPageNUM}
        imageHeight="340px"
        textHeight="95px"
        loading={upcomingPageLoading}
      />
    </div>
  );
}
