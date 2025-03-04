import { Link } from "react-router-dom";

const releases: Array<{
  version: string;
  downloadUrl: string;
  githubUrl: string;
  websiteUrl: string | null;
  demoUrl: string;
}> = [
  {
    version: "0.0.0",
    downloadUrl:
      "https://sourceforge.net/projects/anti-copy-paster/files/v0.0.0/",
    websiteUrl: null,
    githubUrl: "https://github.com/JetBrains-Research/anti-copy-paster",
    demoUrl: "https://www.youtube.com/watch?v=_wwHg-qFjJY&feature=youtu.be",
  },
  {
    version: "1.0.0",
    downloadUrl:
      "https://sourceforge.net/projects/anti-copy-paster/files/v0.0.0/",
    websiteUrl: "https://refactorings.github.io/anticopypaster_sp_site/",
    githubUrl: "https://github.com/refactorings/anti-copy-paster/releases/tag/v1.0.0",
    demoUrl: "https://www.youtube.com/watch?v=_wwHg-qFjJY&feature=youtu.be",
  },
  {
    version: "2.0.0",
    downloadUrl:
      "https://sourceforge.net/projects/anti-copy-paster/files/v0.0.0/",
    websiteUrl: "https://se4airesearch.github.io/AntiCopyPaster_Summer2023/",
    githubUrl: "https://github.com/refactorings/anti-copy-paster/releases/tag/v2.0.0",
    demoUrl: "https://www.youtube.com/watch?v=Y1sbfpds2Ms",
  },
  {
    version: "3.0.0",
    downloadUrl:
      "https://sourceforge.net/projects/anti-copy-paster/files/v0.0.0/",
    websiteUrl: "https://acpf2023.vercel.app/",
    githubUrl: "https://github.com/refactorings/anti-copy-paster/releases/tag/v3.1.1",
    demoUrl: "https://www.youtube.com/watch?v=EzfU5trG7Lw",
  },
];

export const ReleasesDocs = () => {
  return (
    <div className="flex flex-col">
      <h1 className="docs-header">Releases</h1>
      <table id="release-info" className="mt-8">
        <thead>
          <tr>
            <th>Version</th>
            <th>Download</th>
            <th>Github</th>
            <th>Website</th>
            <th>Demo</th>
          </tr>
        </thead>
        <tbody>
          {releases.map(
            (
              { version, downloadUrl, githubUrl, websiteUrl, demoUrl },
              index
            ) => (
              <tr key={`releases-row-${index}`}>
                <td>v{version}</td>
                <td>
                  <button className="release-redirect-button">
                    <Link to={downloadUrl} target="_blank">
                      Plugin
                    </Link>
                  </button>
                </td>
                <td>
                  <button className="release-redirect-button">
                    <Link to={githubUrl} target="_blank">
                      Code
                    </Link>
                  </button>
                </td>
                <td>
                  {websiteUrl ? (
                    <button className="release-redirect-button">
                      <Link to={websiteUrl} target="_blank">
                        URL
                      </Link>
                    </button>
                  ) : null}
                </td>
                <td>
                  {
                    <button className="release-redirect-button">
                      <Link to={demoUrl} target="_blank">
                        Demo
                      </Link>
                    </button>
                  }
                </td>
              </tr>
            )
          )}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
