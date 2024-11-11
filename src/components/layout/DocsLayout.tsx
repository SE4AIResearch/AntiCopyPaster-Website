import { Outlet } from "react-router-dom";
import DocsSidebar from "./docs/DocsSidebar";
import { Navbar } from "./Navbar";

export const DocsLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-row">
        <DocsSidebar />
        <div className="flex flex-grow px-4 md:px-16 lg:px-24 py-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};
