import { Link } from "react-router-dom";
import { Modal } from "../layout/Modal";
import { FiClipboard } from "react-icons/fi";

interface PublicationCardProps {
  title: string;
  docsUrl: string;
  datasetUrl: string;
  citation: string;
  id: string;
}
export const PublicationCard = ({
  id,
  title,
  docsUrl,
  datasetUrl,
  citation,
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
          data-modal-target={id}
          data-modal-toggle={id}
          className="publication-redirect-button"
        >
          Citation
        </button>
        <Modal
          targetID={id}
          title="Citation"
          children={
            <div className="flex flex-col">
              <button
                type="button"
                aria-label="Copy citation to clipboard"
                className="flex flex-row  items-center gap-1 self-end bg-gray-200 border-1 rounded-xl py-1 px-2"
                onClick={() => navigator.clipboard.writeText(citation)}
              >
                <FiClipboard className="text-xl" />
                <span>Copy</span>
              </button>
              <p className="mt-2">{citation}</p>
            </div>
          }
        ></Modal>
      </div>
    </div>
  );
};
