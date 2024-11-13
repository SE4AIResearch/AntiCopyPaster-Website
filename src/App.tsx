import { HashRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { DocsLayout } from "./components/layout/DocsLayout";
import { docsMenus } from "./docsMenu";
import { DocsNotFound } from "./components/layout/docs/DocsNotFound";
import "flowbite";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<IndexPage />} />
        </Route>
        <Route element={<DocsLayout />}>
          {docsMenus.map((docsMenu, index) => (
            <Route
              key={`docs-route-${index}`}
              path={`/docs/${docsMenu.url}`}
              element={docsMenu.content}
            />
          ))}
          <Route path="/docs/*" element={<DocsNotFound />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
