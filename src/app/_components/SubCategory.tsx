import { Button } from "@/components/ui/button";
import { ArrowToRight } from "../_assets/ArrowToRight";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type SubCategory = {
  title: string;
  hrefLink: string | null;
  loading: boolean;
};

export const SubCategory = ({ title, hrefLink, loading }: SubCategory) => {
  return (
    <div className="max-w-[1440px] lg:w-full h-[36px] flex justify-between items-center">
      {loading ? (
        <>
          <Skeleton className="w-[250px] h-8 rounded-full" />
          <Skeleton className="w-[165px] h-8 rounded-full" />
        </>
      ) : (
        <>
          <p className="font-semibold text-[32px]">{title}</p>
          {hrefLink && (
            <Link
              className="rounded-[6px] z-10 flex gap-2 items-center font-medium text-[14px] hover:underline"
              href={hrefLink}
            >
              <Button variant="ghost">
                See More <ArrowToRight />
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};
