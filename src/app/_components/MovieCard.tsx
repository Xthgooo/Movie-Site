import { Rating } from "@/components/Rating";

type MovieCardType = {
  cover: string;
  rating: number;
  movieTitle: string;
  imageHeight: string;
  textHeight: string;
};

export const MovieCard = ({
  cover,
  rating,
  movieTitle,
  imageHeight,
  textHeight,
}: MovieCardType) => {
  return (
    <div className="w-full flex flex-col gap-1  justify-self-center  rounded-[8px] bg-[#F4F4F5] dark:bg-black">
      <img
        className="w-full bg-cover rounded-[8px]"
        style={{ height: imageHeight }}
        src={`https://image.tmdb.org/t/p/w500${cover}`}
        alt="movie poster image"
      />
      <div
        className="w-full flex flex-col p-2 overflow-hidden"
        style={{ height: textHeight }}
      >
        <Rating
          rating={rating.toFixed(1)}
          starWidth="13px"
          starHeight="13px"
          black={true}
          fontsize="14px"
        />
        <p className="w-full text-[18px]">{movieTitle}</p>
      </div>
    </div>
  );
};
