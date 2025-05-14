"use client";

import * as React from "react";
import { SearchIcon } from "@/app/_assets/SearchIcon";
import { Button } from "@/components/ui/button";
import { myToken, Response } from "@/components/GenresContext";
import { Line } from "@/app/_assets/DividerLine";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MovieSuggestionTemplate } from "./MovieSuggestionTemplate";
import axios from "axios";
import Link from "next/link";

export function SearchBarWithSuggests() {
  const [open, setOpen] = React.useState(false);
  const [clickedMovieID, setClickedMovieID] = React.useState<number | null>(
    null
  );
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [suggests, setSuggests] = React.useState<any[]>([]);

  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    setSearchValue(searchInput);

    if (searchInput.trim() === "") {
      setSuggests([]);
      setOpen(false);
      return;
    }
  };

  React.useEffect(() => {
    const getMoviesByAxios = async () => {
      if (searchValue.trim() === "") return;
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      setSuggests(data.results);
      setOpen(true);
    };

    getMoviesByAxios();
  }, [searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-[379px] h-[36px] flex items-center px-3 text-[#71717A] rounded-[8px] border-[1px] border-[#E4E4E7] gap-2.5">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search a movie..."
            className="w-full h-full text-[14px] bg-transparent outline-none"
            onChange={HandleSearch}
            value={searchValue}
          />
        </Button>
      </PopoverTrigger>
      {suggests.length > 0 && (
        <PopoverContent className="w-[557px] h-fit flex flex-col p-3 gap-4">
          <Command>
            <CommandList>
              {suggests.length === 0 ? (
                <CommandEmpty>
                  Sorry. We can't find a movie with name "{searchValue}"
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggests.map((movie) => (
                    <div key={movie.id} className="w-full flex flex-col">
                      <Link href={`/movies/${movie.id}`} key={movie.id}>
                        <CommandItem
                          value={movie.id.toString()}
                          onSelect={() => {
                            if (clickedMovieID !== movie.id) {
                              setClickedMovieID(movie.id);
                            }
                            setOpen(false);
                          }}
                        >
                          <MovieSuggestionTemplate
                            movieCover={movie.poster_path}
                            movieTitle={movie.title}
                            rating={movie.vote_average}
                            released={movie.release_date}
                          />
                        </CommandItem>
                      </Link>
                      <Line lineWidth="full" />
                    </div>
                  ))}
                </CommandGroup>
              )}
              <Link href={`/searchresultsfor?movie=${searchValue}`}>
                <p className="px-4 py-[10px] text-[14px]">
                  See all results for "{searchValue}"
                </p>
              </Link>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
