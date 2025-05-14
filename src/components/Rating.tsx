import { YellowStar } from "@/app/_assets/YellowStar";

type RatingTemplate = {
  rating: string;
  starWidth: string;
  starHeight: string;
  black: boolean;
  fontsize: string;
};
export const Rating = ({
  rating,
  starWidth,
  starHeight,
  black,
  fontsize,
}: RatingTemplate) => {
  return (
    <div className="flex h-[23px] gap-[5px] items-center">
      <YellowStar width={starWidth} height={starHeight} />
      <p>
        <strong
          style={{
            color: black ? "black" : "white",
            fontSize: fontsize,
          }}
        >
          {rating}
        </strong>
        /10
      </p>
    </div>
  );
};
