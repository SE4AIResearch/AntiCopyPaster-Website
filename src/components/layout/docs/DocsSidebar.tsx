import { useLocation } from "react-router-dom";
import { DocsMenu } from "./DocsMenu";
import { docsMenus } from "../../../docsMenu";

export default function DocsSidebar() {
  const { pathname } = useLocation();

  return (
    <ul className="py-4 border-r-[1px] border-gray-400 h-[calc(100vh-80px)] hidden md:block">
      {docsMenus.map((menu, index) => (
        <DocsMenu
          key={`menu-${index}`}
          title={menu.title}
          url={menu.url}
          isActive={pathname.replace("/docs/", "") == menu.url}
        />
      ))}
    </ul>
  );
}
