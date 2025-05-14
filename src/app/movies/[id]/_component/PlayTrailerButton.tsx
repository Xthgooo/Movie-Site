export const PlayTrailer = ({
  videoDuration,
}: {
  videoDuration: string | null;
}) => {
  return (
    <div className="w-[174px] h-10 flex gap-3 items-center">
      <div className="w-10 h-10 rounded-[50%] bg-white relative flex justify-center items-center ">
        <div className="absolute">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33301 2L12.6663 8L3.33301 14V2Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p className="text-white text-base">Play trailer</p>
      <p className="text-white text-base">{videoDuration}</p>
    </div>
  );
};
