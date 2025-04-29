import { ReactNode } from "react";
import { AboutDocs } from "./components/layout/docs/pages/AboutDocs";
import { GettingStartedDocs } from "./components/layout/docs/pages/GettingStartedDocs";
import { ReleasesDocs } from "./components/layout/docs/pages/ReleasesDocs";
import { AdvancedSettingDocs } from "./components/layout/docs/pages/AdvancedSettingDocs";
import AlgorithmsDocs from "./components/layout/docs/pages/AlgorithmsDocs";
import ModelDocs from "./components/layout/docs/pages/ModelDocs"
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
    title: "Advanced Settings",
    url: "advanced-settings",
    content: <AdvancedSettingDocs />,
  },
  {
    title: "Algorithms",
    url: "algorithms",
    content: <AlgorithmsDocs />,
  },
  {
    title: "Model",
    url: "model",
    content: <ModelDocs />,
  },
];
