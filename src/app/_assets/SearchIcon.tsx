export const SearchIcon = ({ turnWhite }: { turnWhite: boolean }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 14.5L11.1333 11.6333M12.6667 7.83333C12.6667 10.7789 10.2789 13.1667 7.33333 13.1667C4.38781 13.1667 2 10.7789 2 7.83333C2 4.88781 4.38781 2.5 7.33333 2.5C10.2789 2.5 12.6667 4.88781 12.6667 7.83333Z"
        stroke={turnWhite ? "#FFFFFF" : "#18181B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
