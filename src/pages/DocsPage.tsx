import { useLocation } from "react-router-dom";
import { DocsMenu } from "../docsMenu";
import { docsMenus } from "../docsMenu";

const searchMenu = (
  key: string,
  menus: DocsMenu[] = docsMenus
): DocsMenu | null => menus.find((menu) => menu.url === key) || null;

export const DocsPage = () => {
  const { pathname } = useLocation();
  const pathKey = pathname.replace("/docs/", "");
  const menu = searchMenu(pathKey);

  if (!menu) return <h1 className="text-2xl">Document Not Found</h1>;

  return menu.content;
};
