import { useEffect, useState } from "react";

interface GithubStat {
  watchCount: number;
  forkCount: number;
  starCount: number;
}

export const GithubStat = () => {
  const [githubInfo, setGithubInfo] = useState<GithubStat>({
    watchCount: 0,
    forkCount: 0,
    starCount: 0,
  });

  useEffect(() => {
    const fetchGithubInfo = async () => {
      const githubDataResponse = await fetch(
        "https://api.github.com/repos/JetBrains-Research/anti-copy-paster"
      );

      const githubData: {
        forks_count: number;
        stargazers_count: number;
        watchers_count: number;
      } = await githubDataResponse.json();

      setGithubInfo({
        forkCount: githubData.forks_count,
        starCount: githubData.stargazers_count,
        watchCount: githubData.watchers_count,
      });
    };

    fetchGithubInfo();
  }, []);

  return (
    <div className="lg:mt-[2rem] md:mt-[1.75rem] mt-[1.5rem] lg:px-10 md:px-8 px-4 lg:py-8 md:py-6 py-4 rounded-3xl">
      <h1 className="text-white text-6xl font-bold text-center">
        Statistics from GitHub
      </h1>
      <p className="text-gray-400 text-xl text-center mt-2">
        AntiCopyPaster has consistent releases with user-friendly advanced
        settings.
      </p>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8">
        <dl className="grid grid-cols-3 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base/7 text-white">Forks</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {githubInfo.forkCount}
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base/7 text-white">Stars</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {githubInfo.starCount}
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base/7 text-white">Watches</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {githubInfo.watchCount}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};