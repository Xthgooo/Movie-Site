import Link from "next/link";
import { FilmIcon } from "../app/_assets/FilmIcon";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="w-[92px] h-[20px] flex justify-between items-center "
    >
      <FilmIcon />
      <i style={{ color: "#4338CA", fontSize: "16px", fontWeight: "bold" }}>
        Movie Z
      </i>
    </Link>
  );
};
