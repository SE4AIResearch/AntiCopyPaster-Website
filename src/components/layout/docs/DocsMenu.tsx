import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface DocsMenu {
  title: string;
  keyName: string;
  content: ReactNode;
}

interface DocsMenuProps {
  title: string;
  url: string;
  isActive: boolean;
}

export const DocsMenu = ({ title, url, isActive }: DocsMenuProps) => {
  return (
    <>
      <Link to={`/docs/${url}`}>
        <li
          className={`flex flex-row gap-1 px-4 py-[5px] min-w-[280px] items-center${
            isActive ? " bg-blue-600 text-white" : ""
          }`}
        >
          <div>{title}</div>
        </li>
      </Link>
    </>
  );
};
