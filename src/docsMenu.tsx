import { ReactNode } from "react";
import { AboutDocs } from "./components/layout/docs/pages/AboutDocs";
import { GettingStartedDocs } from "./components/layout/docs/pages/GettingStartedDocs";
import { ReleasesDocs } from "./components/layout/docs/pages/ReleasesDocs";
import { PublicationDocs } from "./components/layout/docs/pages/PublicationDocs";
import { AdvancedSettingDocs } from "./components/layout/docs/pages/AdvancedSettingDocs";

export interface DocsMenu {
  title: string;
  url: string;
  content: ReactNode;
}

export const docsMenus: Array<DocsMenu> = [
  {
    title: "Getting Started",
    url: "getting-started",
    content: <GettingStartedDocs />,
  },
  {
    title: "About",
    url: "about",
    content: <AboutDocs />,
  },
  {
    title: "Releases",
    url: "releases",
    content: <ReleasesDocs />,
  },
  {
    title: "Publications",
    url: "publications",
    content: <PublicationDocs />,
  },
  {
    title: "Advanced Settings",
    url: "advanced-settings",
    content: <AdvancedSettingDocs />,
  },
];
