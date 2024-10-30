import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { DocsLayout } from "./components/layout/DocsLayout";
import { DocsPage } from "./pages/DocsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<IndexPage />} />
        </Route>
        <Route element={<DocsLayout />}>
          <Route path="/docs/*" element={<DocsPage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
