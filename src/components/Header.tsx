"use client";

import { Logo } from "./Logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/app/_assets/SearchIcon";
import { useContext, useState } from "react";
import { SelectArrow } from "@/app/_assets/SelectArrow";
import { NighModeIcon } from "@/app/_assets/NightModeIcon";
import { SearchBarWithSuggests } from "./SearchBarWithSuggestions";
import { useRouter, useSearchParams } from "next/navigation";
import { Line } from "@/app/_assets/DividerLine";
import { SmallArrowToRight } from "@/app/_assets/SmallArrowToRight";
import { Badge } from "./ui/badge";
import { GenreContext } from "./GenresContext";
import { useTheme } from "next-themes";

export const Header = () => {
  const searchParams = useSearchParams();
  const genreID = searchParams.get("genre");
  const { genres } = useContext(GenreContext);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed  z-10000 w-screen h-[59px] flex px-12 lg:px-20 justify-between items-center"
      style={{
        background:
          theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Logo />
      <div className="lg:flex gap-3 hidden">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button>
              <SelectArrow turnWhite={theme === "dark"} />
              Genre
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[577px]">
            <div className="w-full h-fit flex flex-col ">
              <h3 className="text-[24px] font-semibold">Genre</h3>
              <p className="text-[16px] mt-1">See lists of movies by genre</p>
              <div className="h-[33px] flex items-center">
                <Line />
              </div>
              <div className="flex gap-4 flex-wrap">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => {
                      setOpen(false);
                      router.push(`/searchbygenre?genre=${genre.id}`);
                    }}
                  >
                    <Badge
                      variant={
                        Number(genreID) === genre.id ? "default" : "outline"
                      }
                      className="flex items-center gap-2"
                    >
                      {genre.name}
                      <SmallArrowToRight white={Number(genreID) === genre.id} />
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <SearchBarWithSuggests />
      </div>
      <div className="flex gap-3">
        <Button className="flex lg:hidden">
          <SearchIcon turnWhite={theme === "dark"} />
        </Button>

        <Button
          className="rounded-[10px] flex gap-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <NighModeIcon turnWhite={theme === "dark"} />
        </Button>
      </div>
    </div>
  );
};
