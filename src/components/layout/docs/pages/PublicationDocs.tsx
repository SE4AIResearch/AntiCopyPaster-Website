import { PublicationCard } from "../../../publications/PublicationCard";

const publications: Array<{
  title: string;
  docsUrl: string;
  datasetUrl: string;
  citation: string;
}> = [
  {
    title:
      "AlOmar, E.A., Ivanov, A., Kurbatova, Z., Golubev, Y., Mkaouer, M.W., Ouni, A., Bryksin, T., Nguyen, L., Kini, A. and Thakur, A., 2023. Just-in-time code duplicates extraction. Information and Software Technology, 158, p.107169.",
    docsUrl: "https://arxiv.org/pdf/2302.03416",
    datasetUrl: "https://zenodo.org/records/7428835",
    citation: `@article{alomar2023just,
title={Just-in-time code duplicates extraction},
author={AlOmar, Eman Abdullah and Ivanov, Anton and Kurbatova, Zarina and Golubev, Yaroslav and Mkaouer, Mohamed Wiem and Ouni, Ali and Bryksin, Timofey and Nguyen, Le and Kini, Amit and Thakur, Aditya},
journal={Information and Software Technology},
volume={158},
pages={107169},
year={2023},
publisher={Elsevier}
}`,
  },
  {
    title:
      "AlOmar, E.A., Ivanov, A., Kurbatova, Z., Golubev, Y., Mkaouer, M.W., Ouni, A., Bryksin, T., Nguyen, L., Kini, A. and Thakur, A., 2022, October. AntiCopyPaster: extracting code duplicates as soon as they are introduced in the IDE. In Proceedings of the 37th IEEE/ACM International Conference on Automated Software Engineering (pp. 1-4).",
    docsUrl: "https://arxiv.org/pdf/2112.15230",
    datasetUrl: "https://zenodo.org/records/7428835",
    citation: `@inproceedings{alomar2022anticopypaster,
title={AntiCopyPaster: Extracting Code Duplicates As Soon As They Are Introduced in the IDE},
author={Alomar, Eman Abdullah and Ivanov, Anton and Kurbatova, Zarina and Golubev, Yaroslav and Mkaouer, Mohamed Wiem and Ouni, Ali and Bryksin, Timofey and Nguyen, Le and Kini, Amit and Thakur, Aditya},
booktitle={37th IEEE/ACM International Conference on Automated Software Engineering (ASE)},
pages={1--4},
year={2022}
}`,
  },
];
export const PublicationDocs = () => {
  return (
    <>
      <h1 className="docs-header">Publications</h1>
      <div className="mt-4 flex flex-col gap-4">
        {publications.map(({ title, docsUrl, datasetUrl, citation }, index) => (
          <PublicationCard
            key={`publication-${index}`}
            id={`publication-${index}`}
            title={title}
            docsUrl={docsUrl}
            datasetUrl={datasetUrl}
            citation={citation}
          />
        ))}
      </div>
    </>
  );
};
