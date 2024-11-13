import { Outlet } from "react-router-dom";
import DocsSidebar from "./docs/DocsSidebar";
import { Navbar } from "./Navbar";

export const DocsLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-row h-[calc(100vh-90px)] ">
        <DocsSidebar />
        <div className="px-4 md:px-16 lg:px-24 py-6 flex-grow overflow-y-auto max-h-[100%]">
          <Outlet />
        </div>
      </main>
    </>
  );
};
