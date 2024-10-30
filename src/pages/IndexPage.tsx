import { Link } from "react-router-dom";
import { FeatureCard } from "../components/landing/FeatureCard";
import IntellijLogo from "../assets/intellij-logo.webp";

export const IndexPage = () => {
  return (
    <main className="bg-[#130045] py-16">
      <div className="w-100 max-w-[1200px] mx-auto px-4">
        <div id="landing-name">
          <h1 className="text-white font-bold lg:text-[32px] md:text-[28px] text-[24px] flex flex-row items-center">
            <img
              className="h-[45px] w-[45px]"
              alt="intellij-logo"
              src={IntellijLogo}
            />
            <span className="ml-2">AntiCopyPaster</span>
          </h1>
        </div>
        <div id="landing-quote" className="mt-2">
          <h1 className="text-white font-bold lg:text-[56px] md:text-[48px] text-[36px]">
            Extracting Code Duplicates
          </h1>
        </div>
        <div id="landing-desc" className="mt-2">
          <p className="text-white lg:text-[24px] md:text-[20px] text-[18px]">
            AntiCopyPaster is a plugin for IntelliJ IDEA that tracks the copying
            and pasting carried out by the developer and suggests extracting{" "}
            <b>duplicates</b> into a new method as soon as they are introduced
            in the code.
          </p>
        </div>
        <div className="flex flex-row gap-2 lg:mt-[45px] mt-[25px]">
          <Link to="/docs/getting-started">
            <button className="text-white bg-[#FF6F61] text-[18px] rounded-2xl py-2 px-4">
              Get Started
            </button>
          </Link>
          <Link to="https://github.com/JetBrains-Research/anti-copy-paster">
            <button className="text-white bg-[#008080] text-[18px] rounded-2xl py-2 px-4">
              Read Github
            </button>
          </Link>
        </div>
        <div className="mt-[50px] relative">
          <iframe
            className="w-full h-[50vh]"
            src="https://www.youtube.com/embed/Y1sbfpds2Ms?si=hunSsFFBj3e8oijM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-[50px]">
          <h1 className="text-white text-4xl font-bold">
            Why use AntiCopyPasta for refactoring?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <FeatureCard
              title="Automatic Duplicate Detection"
              description="Monitors code fragments as they are pasted, scanning for duplicates in real-time to keep your codebase clean and efficient."
            />
            <FeatureCard
              title="Seamless Refactoring"
              description="Proactively suggests the most suitable Extract Method refactoring opportunities, integrating smoothly into your IntelliJ IDEA workflow."
            />
            <FeatureCard
              title="Refactoring Suggestions"
              description="Powered by a classification model with an F-score of 0.82, designed to recommend refactorings based on your coding habits."
            />
          </div>
        </div>
      </div>
    </main>
  );
};
