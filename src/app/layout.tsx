"use client";

import { PropsWithChildren, useContext } from "react";
import "./globals.css";
import { GenreContextProvider } from "../components/GenresContext";
import { UpcomingMovies } from "@/components/UpcomingMovies";
import { PopularMovies } from "@/components/PopularMovies";
import { TopRatedMovies } from "@/components/TopRatedMovies";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center">
        <GenreContextProvider>
          <UpcomingMovies>
            <PopularMovies>
              <TopRatedMovies>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <div className="full flex flex-col items-center">
                    <Header />
                    <div className="w-full lg:mt-21 mt-[59px] flex flex-col">
                      <div className="w-full -px-20 flex items-center">
                        {children}
                      </div>
                      <Footer />
                    </div>
                  </div>
                </ThemeProvider>
              </TopRatedMovies>
            </PopularMovies>
          </UpcomingMovies>
        </GenreContextProvider>
      </body>
    </html>
  );
}
