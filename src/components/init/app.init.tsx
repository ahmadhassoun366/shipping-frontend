"use client";

// import WOMLogo from 'data-base64:src/assets/logo/WOM-Logo.svg';
import { useContext, useEffect, useState } from "react";

import ThemeSvcContext from "@/shared/services/theme/theme.context";
import ThemeService from "@/shared/services/theme/theme.service";

type AppInitProps = {
  children: React.ReactNode;
};

export default function AppInit({ children }: AppInitProps) {
  // *~~*~~*~~ Auth svc ~~*~~*~~* //
  const themeSvc = useContext<ThemeService>(ThemeSvcContext);

  // *~~*~~*~~ state ~~*~~*~~* //
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // *~~*~~*~~ LOAD THEME ~~*~~*~~* //

      if (typeof window === "undefined" || !document.querySelector("html"))
        return;

      document.querySelector("html")!.classList.add("light");

      await themeSvc.loadTheme();

      setLoaded(true);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: add loading screen
  if (!loaded) {
    return (
      <div className="bg-white w-screen h-screen flex items-center justify-center">
        {/* <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
          />
        </div> */}
        {/* <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div> */}
      </div>
    );
  }

  return <div>{children}</div>;
}