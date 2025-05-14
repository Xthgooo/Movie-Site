type YellowStarType = {
  width: string;
  height: string;
};

export const YellowStar = ({ width, height }: YellowStarType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9997 1.33325L16.6047 8.63659L24.6663 9.81492L18.833 15.4966L20.2097 23.5233L12.9997 19.7316L5.78967 23.5233L7.16634 15.4966L1.33301 9.81492L9.39467 8.63659L12.9997 1.33325Z"
        fill="#FDE047"
        stroke="#FDE047"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
