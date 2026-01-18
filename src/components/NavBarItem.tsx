import type { FC } from "react";
import type { IconType } from "react-icons";

export interface NavBarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: IconType;
}

export const NavBarItem: FC<NavBarItemProps> = ({
  label,
  isActive,
  onClick,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 h-full px-3 py-2 rounded-md transition-colors
        ${
          isActive
            ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }`}
      aria-label={`Go to ${label}`}
    >
      <Icon className="h-6 w-6" />
      <span className="hidden md:flex">{label}</span>
    </button>
  );
};
