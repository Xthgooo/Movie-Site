import { Line } from "@/app/_assets/DividerLine";
import { Skeleton } from "./ui/skeleton";
import { useMediaQuery } from "react-responsive";

type CreatersListinType = {
  role: string;
  names: string[];
};

export const CreatersList = ({ role, names }: CreatersListinType) => {
  return (
    <div className="w-full gap-1 flex flex-col">
      <div className="flex gap-13">
        <p className="w-16 text-[16px] font-bold">{role}</p>{" "}
        <div className="flex gap-1">
          {names.map((name, i) => (
            <p key={i} className="text-base">
              {name}
              {i !== names.length - 1 && " · "}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <Line />
      </div>
    </div>
  );
};
