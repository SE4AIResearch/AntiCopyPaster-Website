import { Link } from "react-router-dom";
import { FeatureCard } from "../components/landing/FeatureCard";
import IntellijLogo from "../assets/intellij-logo.webp";
import AntiCopyPasterPreview from "../assets/anticopypaster-preview.webp";
import { FiDownload, FiPlayCircle } from "react-icons/fi";
import { GithubStat } from "../components/landing/GithubStat";

export const IndexPage = () => {
  return (
    <main className="bg-[#130045] lg:py-8 md:py-6 py-4">
      <div className="w-100 max-w-screen-xl mx-auto px-4">
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
        <div className="flex flex-row gap-2 lg:mt-[2rem] mt-[1.5rem]">
          <Link
            to="https://sourceforge.net/projects/anti-copy-paster/"
            target="_blank"
          >
            <button className="text-white bg-[#DE2477] lg:text-[1.25rem] md:[1.125rem] text-[1rem] rounded-2xl py-2 px-4">
              <span className="flex flex-row items-center gap-2">
                <FiDownload /> Download
              </span>
            </button>
          </Link>
          <Link
            to="https://www.youtube.com/embed/_wwHg-qFjJY?si=ETnXtgm5HKi8LJMl"
            target="_blank"
          >
            <button className="text-white bg-[#DE2477] lg:text-[1.25rem] md:[1.125rem] text-[1rem] rounded-2xl py-2 px-4">
              <span className="flex flex-row items-center gap-2">
                <FiPlayCircle /> Watch Demo
              </span>
            </button>
          </Link>
        </div>
        <div className="lg:mt-[2rem] md:mt-[1.75rem] mt-[1.5rem] bg-gray-600 lg:px-10 md:px-8 px-4 lg:py-8 md:py-4 py-6 rounded-3xl">
          <h2 className="text-white lg:text-[2rem] md:text-[1.5rem] text-[1.15em] font-extrabold">
            AntiCopyPaster is an open-source plugin for IntelliJ IDEA that
            automatically detects copied and pasted code and suggests an
            appropriate extraction.
          </h2>
          <p className="text-white lg:text-[1.25rem] md:text-[1em] text-[0.95rem] mt-2">
            Previously developed by a team at Rochester Institute of Technology,
            Stevens Institute of Technology, and JetBrains Research, our goal
            was to take this functionality and improve upon its design and
            performance.
          </p>
          <div className="relative w-full overflow-hidden mt-4 rounded-3xl">
            <img
              className="w-full h-full scale-[260%] sm:scale-[200%] md:scale-[150%] lg:scale-[100%] object-cover"
              alt="anticopypaster-preview"
              src={AntiCopyPasterPreview}
            />
          </div>
        </div>
        <GithubStat />
        <div className="lg:mt-[4rem] md:mt-[3.5rem] mt-[3.25rem]">
          <h1 className="text-white text-4xl font-bold">
            Why use AntiCopyPaster for refactoring?
          </h1>
          <p className="mt-[1.5rem] text-white lg:text-[1.2rem] md:text-[1.1rem] text-[1rem]">
            Refactoring is the practice of improving software quality without
            altering its behavior. Developers intuitively refactor their code
            for multiple purposes: improving program comprehension, removing
            duplicate code, reducing complexity, dealing with technical debt,
            and removing code smells. Refactoring duplicate code consists in
            taking a code fragment and moving it to create a new method, while
            replacing all instances of that fragment with a call to this newly
            created method. This refactoring is known as Extract Method. The
            goal of this project is to aid developers with just-in-time
            refactoring of duplicate code. Unlike the existing approaches that
            follow a posterior approach of removing accumulated duplicate code,
            we aim at increasing the awareness of developers while writing their
            code, i.e., removing duplicate code as soon as it is introduced in
            their code base.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[2rem]">
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
