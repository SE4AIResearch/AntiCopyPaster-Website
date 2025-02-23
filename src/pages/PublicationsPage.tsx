import { PublicationCard } from "../components/publications/PublicationCard";

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
  {
    title:
      "AlOmar, E.A, Mkaouer, M.W., Ouni, A. 2024, April. Behind the Intent of Extract Method Refactoring: A Systematic Literature Review. IEEE Transactions on Software Engineering. (pp. 668-694)",
    docsUrl: "https://ieeexplore.ieee.org/document/10381511",
    datasetUrl: "https://zenodo.org/records/7428835",
    citation: `@ARTICLE{10381511,
  author={AlOmar, Eman Abdullah and Mkaouer, Mohamed Wiem and Ouni, Ali},
  journal={IEEE Transactions on Software Engineering}, 
  title={Behind the Intent of Extract Method Refactoring: A Systematic Literature Review}, 
  year={2024},
  volume={50},
  number={4},
  pages={668-694},
  keywords={Codes;Data mining;Systematics;Bibliographies;Software engineering;Behavioral sciences;Software;Extract method;refactoring;quality;systematic literature review},
  doi={10.1109/TSE.2023.3345800}}
}`,
  },
  {
    title: "AlOmar, E.A, Knobloch, B., Kain, T., Kalish, C., Mkaouer, M.W., Ouni A. 2024, May. AntiCopyPaster 2.0: Whitebox just-in-time code duplicates extraction. In Proceedings of the 2024 IEEE/ACM 46th International Conference on Software Engineering: Companion Proceedings (pp. 84-88).",
    docsUrl: "https://dl.acm.org/doi/abs/10.1145/3639478.3640035",
    datasetUrl: "https://zenodo.org/records/7428835",
    citation: `@inproceedings{10.1145/3639478.3640035,
author = {AlOmar, Eman Abdullah and Knobloch, Benjamin and Kain, Thomas and Kalish, Christopher and Mkaouer, Mohamed Wiem and Ouni, Ali},
title = {AntiCopyPaster 2.0: Whitebox just-in-time code duplicates extraction},
year = {2024},
isbn = {9798400705021},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3639478.3640035},
doi = {10.1145/3639478.3640035},
abstract = {AntiCopyPaster is an IntelliJ IDEA plugin, implemented to detect and refactor duplicate code interactively as soon as a duplicate is introduced. The plugin only recommends the extraction of a duplicate when it is worth it. In contrast to current Extract Method refactoring approaches, our tool seamlessly integrates with the developer's workflow and actively provides recommendations for refactorings. This work extends our tool to allow developers to customize the detection rules, i.e., metrics, based on their needs and preferences. The plugin and its source code are publicly available on GitHub at https://github.com/refactorings/anti-copy-paster. The demonstration video can be found on YouTube: https://youtu.be/Y1sbfpds2Ms.},
booktitle = {Proceedings of the 2024 IEEE/ACM 46th International Conference on Software Engineering: Companion Proceedings},
pages = {84–88},
numpages = {5},
keywords = {refactoring, duplicated code, software quality},
location = {Lisbon, Portugal},
series = {ICSE-Companion '24}
}`,
  },
];
export const PublicationsPage = () => {
  return (
    <>
      <h1 className="docs-header">Publications</h1>
      <div className="flex justify-center">
        <div className="mt-4 flex flex-col gap-4 w-[65%]">
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
      </div>
    </>
  );
};
