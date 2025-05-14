export const PlayTriangle = ({ white }: { white: boolean }) => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33301 1L10.6663 7L1.33301 13V1Z"
        stroke={white ? "#FFFFFF" : "#18181B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
