import { Link } from "react-router-dom";
import { FiBook, FiDownload, FiGithub } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";
import { MdOutlineInbox } from "react-icons/md";
import { HiOutlineTerminal } from "react-icons/hi";
import { MdMenu } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";

import ContactModal from "../ContactModal.tsx";
import { useState } from "react";

export const Navbar = () => {
  const [contactModalActive, setContactModalActive] = useState(false);
  return (<>
    <ContactModal contactModalActive={contactModalActive} setContactModalActive={setContactModalActive}/>
    <header className="bg-[#27282c] text-white">
      <nav className="max-w-screen-xl flex flex-wrap justify-between mx-auto items-center p-3">
        <div id="navbar-header">
          <Link to="/">
            <span className="font-bold text-[21px] ml-2">AntiCopyPaster</span>
          </Link>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          aria-expanded={false}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          <MdMenu className="text-2xl" />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-3 md:mt-0 md:p-0 border border-gray-100 rounded-lg md:items-center md:flex-row md:border-0">
            <li className="topnav-li">
              <Link to="/docs/getting-started">
                <div className="flex flex-row gap-2 items-center">
                  <FiBook />
                  <span>Documentation</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="/publications">
                <div className="flex flex-row gap-2 items-center">
                  <RiFilePaper2Line />
                  <span>Publications</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="/extractmethod">
                <div className="flex flex-row gap-2 items-center">
                  <HiOutlineTerminal />
                  <span>Extract Method</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="/anticopypaster">
                <div className="flex flex-row gap-2 items-center">
                  <MdOutlineInbox />
                  <span>AntiCopyPaster</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="/community">
                <div className="flex flex-row gap-2 items-center">
                <RiHome3Line />
                <span>Community</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="https://sourceforge.net/projects/anti-copy-paster/">
                <div className="flex flex-row gap-2 items-center">
                  <FiDownload />
                  <span>Download</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="https://github.com/JetBrains-Research/anti-copy-paster">
                <div className="flex flex-row gap-2 items-center">
                  <FiGithub className="border-white border-1" />
                  <span>Github</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <button onClick={()=>setContactModalActive(true)}>
                <div className="mx-auto text-[16px] bg-blue-600 text-white px-4 py-2 rounded-xl">
                  <span>Contact Us</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    </>
  );
};
