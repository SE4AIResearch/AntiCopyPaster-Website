import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

export const Navbar = () => {
  return (
    <header className="bg-[#27282c] text-white h-[80px] flex flex-row items-center justify-center">
      <nav className="flex-1 max-w-[1200px] px-4 flex justify-between items-center">
        <div id="navbar-header">
          <Link to="/">
            <span className="font-bold text-[21px] ml-2">AntiCopyPasta</span>
          </Link>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded="true"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-row gap-6 items-center">
            <li>
              <Link to="/docs/getting-started">Documentation</Link>
            </li>
            <li>
              <Link to="https://sourceforge.net/projects/anti-copy-paster/">
                Download
              </Link>
            </li>
            <li>
              <Link to="https://github.com/JetBrains-Research/anti-copy-paster">
                <div className="flex flex-row gap-2 items-center">
                  <FiGithub className="border-white border-1" />{" "}
                  <span>Github</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
