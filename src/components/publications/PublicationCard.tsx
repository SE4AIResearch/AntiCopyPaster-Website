import { Link } from "react-router-dom";
import { Modal } from "../layout/Modal";
import { FiClipboard } from "react-icons/fi";

interface PublicationCardProps {
  title: string;
  docsUrl: string;
  datasetUrl: string;
  index: number;
  setCitationIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
export const PublicationCard = ({
  title,
  docsUrl,
  datasetUrl,
  index,
  setCitationIndex,
  
}: PublicationCardProps) => {

  return (
    <div className="py-6 px-8 bg-slate-200 rounded-xl">
      <p className="text-[1.15rem]">{title}</p>
      <div className="mt-4 flex flex-row gap-2">
        <Link to={docsUrl} target="_blank">
          <button className="publication-redirect-button">Publication</button>
        </Link>
        <Link to={datasetUrl} target="_blank">
          <button className="publication-redirect-button">Dataset</button>
        </Link>
        <button
          className="publication-redirect-button"
          onClick={() => setCitationIndex(index)}
        >
          Citation
        </button>
        
      </div>
    </div>
  );
};
