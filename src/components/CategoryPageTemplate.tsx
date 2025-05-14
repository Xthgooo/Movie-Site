"use client";
import { useState } from "react";
import {
  MovieCategorizer,
  MovieCategorizerType,
} from "../app/_components/MovieCategorizer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export const CategoryPageTemplate = ({
  hrefLink,
  title,
  moviesList,
  totalPages,
  pageNum,
  setPageNum,
  imageHeight,
  textHeight,
}: MovieCategorizerType & {
  totalPages: number;
  pageNum: number;
  loading: boolean;
  setPageNum: (pageNum: number) => void;
}) => {
  const handlePrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum < totalPages) {
      setPageNum(pageNum + 1);
    }
  };

  const handlePage = (page: number) => {
    setPageNum(page);
  };

  const pageNumArray = [pageNum - 1, pageNum, pageNum + 1].filter(
    (p) => 1 < p && p < totalPages
  );

  return (
    <div className="w-full flex flex-col gap-8 mb-19 lg:px-20 px-5">
      <div className="w-full flex">
        <MovieCategorizer
          hrefLink={hrefLink}
          title={title}
          moviesList={moviesList}
          imageHeight={imageHeight}
          textHeight={textHeight}
        />
      </div>
      <div className="flex justify-end">
        <div className="w-fit">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrev}
                  disabled={pageNum === 1}
                />
              </PaginationItem>
              <PaginationItem className="w-10 h-10 flex justify-center items-center">
                <PaginationLink
                  isActive={pageNum === 1}
                  onClick={() => handlePage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {pageNum > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pageNumArray.map((item, index) => (
                <PaginationItem
                  key={index}
                  className="w-10 h-10 flex justify-center items-center cursor-pointer"
                >
                  <PaginationLink
                    isActive={pageNum === item}
                    onClick={() => handlePage(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 3 && pageNum < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {totalPages > 3 && (
                <PaginationItem className="w-10 h-10 flex justify-center items-center">
                  <PaginationLink
                    isActive={pageNum === totalPages}
                    onClick={() => handlePage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  disabled={pageNum === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
