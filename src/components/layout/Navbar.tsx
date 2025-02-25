import { Link } from "react-router-dom";
import { FiBook, FiDownload, FiGithub } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { useState, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";

export const Navbar = () => {

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => {
    dialogRef.current?.close();
    setModalActive(false);
    document.body.style.overflow = "auto";
  }
  useEffect(() => {
    if (!modalActive) return;
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";

    dialogRef.current?.addEventListener('close', closeModal);

    return () => {
      dialogRef.current?.addEventListener('close', closeModal);
    }
    
  }, [modalActive]);

  return (
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
                  <RiFilePaper2Line />
                  <span>ExtractMethod</span>
                </div>
              </Link>
            </li>
            <li className="topnav-li">
              <Link to="/anticopypaster">
                <div className="flex flex-row gap-2 items-center">
                  <RiFilePaper2Line />
                  <span>AntiCopyPaster</span>
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
              <button
                onClick={() => setModalActive(true)}
                className="mx-auto text-[16px] bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Contact Us
              </button>
                <dialog 
                  ref={dialogRef}
                  className="relative rounded-3xl overflow-visible backdrop:bg-black/50"
                >
                 <div className="relative z-0 w-[120vh] h-[100vh] flex flex-col gap-4 p-6 bg-slate-200 rounded-lg shadow-lg">
                  <p>
                    This research on Extract Method Refactoring, along with the implementation of the code duplicates refactoring extraction tool, was performed by the faculty and students of Stevens Institute of Technology, Rochester Institute of Technology, University of Michigan-Flint in collaboration with JetBrains Research.
                  </p>
                  <p className="mb-5">
                    We invite fellow researchers and software engineers to provide us with feedback and extensions on our research and tool. Please feel free to reach out with your feedback or questions. Your message will be emailed to:
                  </p>
                  <p>Eman Abdullah AlOmar (ealomar@stevens.edu)</p>
                  <p>Mohamed Wiem Mkaouer (mmkaouer@umich.edu)</p>

                  <form id="contact-form" className="p-6 w-full flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="contact-name" className="text-gray-700 font-medium">Name</label>
                        <input id="contact-name" type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="contact-email" className="text-gray-700 font-medium">Email</label>
                        <input id="contact-email" type="email" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="contact-subject" className="text-gray-700 font-medium">Subject</label>
                      <input id="contact-subject" type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="contact-message" className="text-gray-700 font-medium">Message</label>
                      <textarea id="contact-message" rows={4} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <button 
                      type="submit" 
                      className="bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200"
                      onClick={closeModal}
                      >
                      Submit
                    </button>
                  </form>
                </div>

                  <button
                    className="bg-zinc-200 text-black py-2 px-2 rounded-full absolute -top-4 -right-4 z-1"
                    onClick={closeModal}
                  >
                    <IoMdClose />
                  </button>
                </dialog> 
             
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
