import { Button } from "@/components/ui/button";
import { Rating } from "./Rating";
import { ArrowToRight } from "@/app/_assets/ArrowToRight";

type MovieSuggestion = {
  movieCover: string;
  movieTitle: string;
  rating: number;
  released: number;
};

export const MovieSuggestionTemplate = ({
  movieCover,
  movieTitle,
  rating,
  released,
}: MovieSuggestion) => {
  return (
    <div className="w-full h-[116px] flex p-2 gap-4">
      <img
        className="w-[67px] h-full bg-cover rounded-[6px]"
        src={`https://image.tmdb.org/t/p/w500${movieCover}`}
      />
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-[20px] font-semibold">{movieTitle}</p>
          <Rating
            rating={rating.toFixed(1)}
            starWidth="16px"
            starHeight="16px"
            black={true}
            fontsize="14px"
          />
        </div>
        <div className="w-full h-9 flex justify-between">
          <p>{released}</p>
          <Button variant="ghost">
            See More <ArrowToRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
