import { Line } from "@/app/_assets/DividerLine";
import { SmallArrowToRight } from "@/app/_assets/SmallArrowToRight";
import { GenreContext } from "./GenresContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { Badge } from "./ui/badge";

type showGenreType = {
  divWidth: string;
  line: boolean;
  title: string;
  clickedGenre: number | null;
};

export const ShowGenres = ({
  divWidth,
  line,
  title,
  clickedGenre,
}: showGenreType) => {
  const { genres } = useContext(GenreContext);

  return (
    <div className="h-fit flex flex-col" style={{ width: divWidth }}>
      <h3 className="text-[24px] font-semibold">{title}</h3>
      <p className="text-[16px] mt-1">See lists of movies by genre</p>
      <div className="h-[33px] flex items-center">{line && <Line />}</div>
      <div className="flex gap-4 flex-wrap">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/searchbygenre?genre=${genre.id}`}>
            <Badge
              variant={clickedGenre === genre.id ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              {genre.name}
              <SmallArrowToRight white={clickedGenre === genre.id} />
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
