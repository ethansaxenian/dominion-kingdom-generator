import { GiCardPick, GiCastle } from "react-icons/gi";
import { MdSettings } from "react-icons/md";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { NavBarItem } from "./NavBarItem";
import { Button } from "@/components/ui/button";
import { type FC, useEffect, useState } from "react";
import { type Page } from "@/lib";

export interface NavBarProps {
  page: Page;
  setPage: (page: Page) => void;
}

export const NavBar: FC<NavBarProps> = ({ page, setPage }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex w-full items-center justify-between bg-gray-100 dark:bg-gray-900 p-5 mb-4">
      <img src="/favicon.ico" alt="logo" className="h-10 w-10" />
      <NavBarItem
        label="Kingdom Generator"
        isActive={page === "generate"}
        onClick={() => setPage("generate")}
        icon={GiCastle}
      />
      <NavBarItem
        label="Kingdom Settings"
        isActive={page === "settings"}
        onClick={() => setPage("settings")}
        icon={MdSettings}
      />
      <NavBarItem
        label="Browse Cards"
        isActive={page === "browse"}
        onClick={() => setPage("browse")}
        icon={GiCardPick}
      />
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/ethansaxenian/dominion-kingdom-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          aria-label="View source code on GitHub"
        >
          <FaGithub className="h-5 w-5" />
        </a>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <FaMoon className="h-5 w-5" />
          ) : (
            <FaSun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  );
};
