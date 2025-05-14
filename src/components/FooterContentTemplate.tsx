import { FilmIconSmallWhite } from "@/app/_assets/FilmIconSmallWhite";
import Link from "next/link";

type FooterContentType = {
  Width: string;
  title?: string;
  logo?: boolean;
  content: React.ReactNode;
};

export const FooterContentTemplate = ({
  Width,
  title,
  logo,
  content,
}: FooterContentType) => {
  return (
    <div className="flex flex-col gap-3 text-white" style={{ width: Width }}>
      {!logo ? (
        <p className="text-[14px]">{title}</p>
      ) : (
        <Link href="/" className="text-[16px] font-bold flex gap-2">
          <FilmIconSmallWhite />
          <i className="italic">Movie Z</i>
        </Link>
      )}
      <div className="text-[14px]">{content}</div>
    </div>
  );
};
