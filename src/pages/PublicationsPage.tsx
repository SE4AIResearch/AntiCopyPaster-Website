import { useEffect, useRef, useState } from "react";
import { PublicationCard } from "../components/publications/PublicationCard";
import { IoMdClose } from "react-icons/io";

const publications: Array<{
  title: string;
  docsUrl: string;
  datasetUrl: string;
  citation: string;
}> = [
  {
    title:
      "AlOmar, E.A, Mkaouer, M.W., Ouni, A. 2024, April. Behind the Intent of Extract Method Refactoring: A Systematic Literature Review. IEEE Transactions on Software Engineering. (pp. 668-694)",
    docsUrl: "https://ieeexplore.ieee.org/document/10381511",
    datasetUrl: "https://zenodo.org/records/7428835",
    citation: `@article{alomar2024behind,
    title={Behind the intent of extract method refactoring: A systematic literature review},
    author={AlOmar, Eman Abdullah and Mkaouer, Mohamed Wiem and Ouni, Ali},
    journal={IEEE Transactions on Software Engineering},
    volume={50},
    number={4},
    pages={668--694},
    year={2024},
    publisher={IEEE}
}`,
  },
  {
    title: "AlOmar, E.A, Knobloch, B., Kain, T., Kalish, C., Mkaouer, M.W., Ouni A. 2024, May. AntiCopyPaster 2.0: Whitebox just-in-time code duplicates extraction. In Proceedings of the 2024 IEEE/ACM 46th International Conference on Software Engineering: Companion Proceedings (pp. 84-88).",
    docsUrl: "https://dl.acm.org/doi/abs/10.1145/3639478.3640035",
    datasetUrl: "https://zenodo.org/records/7428835",
    citation: `@inproceedings{alomar2024anticopypaster,
  title={AntiCopyPaster 2.0: Whitebox just-in-time code duplicates extraction},
  author={AlOmar, Eman Abdullah and Knobloch, Benjamin and Kain, Thomas and Kalish, Christopher and Mkaouer, Mohamed Wiem and Ouni, Ali},
  booktitle={Proceedings of the 2024 IEEE/ACM 46th International Conference on Software Engineering: Companion Proceedings},
  pages={84--88},
  year={2024}
}`,
  },
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
  title={AntiCopyPaster: extracting code duplicates as soon as they are introduced in the IDE},
  author={AlOmar, Eman Abdullah and Ivanov, Anton and Kurbatova, Zarina and Golubev, Yaroslav and Mkaouer, Mohamed Wiem and Ouni, Ali and Bryksin, Timofey and Nguyen, Le and Kini, Amit and Thakur, Aditya},
  booktitle={Proceedings of the 37th IEEE/ACM International Conference on Automated Software Engineering},
  pages={1--4},
  year={2022}
}`,
  },
  
];
export const PublicationsPage = () => {

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [citationIndex, setCitationIndex ] = useState<number | null>(null);

  const closeModal = () => {
    dialogRef.current?.close();
    setCitationIndex(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    console.log(citationIndex)
    if (citationIndex == null) return;

    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";

    const scrollContainer = dialogRef.current?.querySelector("div");
    if (scrollContainer) {
        scrollContainer.scrollLeft = 0;
    }

    dialogRef.current?.addEventListener('close', closeModal);

    return () => {
      dialogRef.current?.addEventListener('close', closeModal);
    }
    

  }, [citationIndex])

  
  return (
    <>
      <dialog 
        ref={dialogRef}
        className="fixed p-10 rounded-xl overflow-visible backdrop:bg-black/50"
      >
        <div className="relative w-[100%] sm:w-[40vw] overflow-x-scroll sm:overflow-x-scroll">
         { citationIndex != null && <pre>{publications[citationIndex].citation}</pre>}
        </div>
        <button
          className="bg-zinc-200 text-black py-2 px-2 rounded-full absolute -top-4 -right-4 z-1"
          onClick={closeModal}
        >
          <IoMdClose />
        </button>
      </dialog>
      <h1 className="docs-header">Publications</h1>
      <div className="flex justify-center">
        <div className="mt-4 flex flex-col gap-4 w-[65%]">
            {publications.map(({ title, docsUrl, datasetUrl }, index) => (
              <PublicationCard
                key={title}
                index={index}
                title={title}
                docsUrl={docsUrl}
                datasetUrl={datasetUrl}
                setCitationIndex={setCitationIndex}
              />
            ))}
      
        </div>
      </div>
    </>
  );
};
