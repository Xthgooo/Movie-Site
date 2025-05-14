import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "@/app/_assets/SearchIcon";

function SearchInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="w-[379px] h-[36px] flex items-center px-3 color-[#71717A] rounded-[8px] border-[1px] border-[#E4E4E7] gap-2.5">
      <SearchIcon />
      <input
        type="string"
        placeholder="Search a movie..."
        data-slot="input"
        className="w-full h-full text-[14px]"
      />
    </div>
  );
}

export { SearchInput };
