import { Link } from "react-router-dom";
import { FeatureCard } from "../components/landing/FeatureCard";
import IntellijLogo from "../assets/intellij-logo.webp";

export const IndexPage = () => {
  return (
    <main className="bg-[#130045] lg:py-16 md:py-8 py-4">
      <div className="w-100 max-w-[1200px] mx-auto px-4">
        <div id="landing-name">
          <h1 className="text-white font-bold lg:text-[2rem] md:text-[1.75rem] text-[1.5rem] flex flex-row items-center">
            <img
              className="h-[45px] w-[45px]"
              alt="intellij-logo"
              src={IntellijLogo}
            />
            <span className="ml-2">AntiCopyPaster</span>
          </h1>
        </div>
        <div id="landing-quote" className="mt-2">
          <h1 className="text-white font-bold lg:text-[3.5rem] md:text-[3rem] text-[2.25rem]">
            Extracting Code Duplicates
          </h1>
        </div>
        <div id="landing-desc" className="mt-2">
          <p className="text-white lg:text-[1.5rem] md:text-[1.25rem] text-[1.125rem]">
            AntiCopyPaster is a plugin for IntelliJ IDEA that tracks the copying
            and pasting carried out by the developer and suggests extracting{" "}
            <b>duplicates</b> into a new method as soon as they are introduced
            in the code.
          </p>
        </div>
        <div className="flex flex-row gap-2 lg:mt-[2.8rem] mt-[1.5rem]">
          <Link to="https://sourceforge.net/projects/anti-copy-paster/">
            <button className="text-white bg-[#DE2477] text-[20px] rounded-2xl py-2 px-6">
              Download
            </button>
          </Link>
        </div>
        <div className="mt-[50px] relative">
          <iframe
            className="w-full h-[40vw]"
            src="https://www.youtube.com/embed/_wwHg-qFjJY?si=ETnXtgm5HKi8LJMl"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="lg:mt-16 md:mt-8 mt-4">
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
