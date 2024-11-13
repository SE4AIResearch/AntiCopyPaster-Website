import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

export const Modal = ({
  targetID,
  title,
  children,
}: {
  targetID: string;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div
      id={targetID}
      tabIndex={-1}
      aria-hidden={true}
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide={targetID}
            >
              <MdClose className="text-xl" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              className="bg bg-red-600 text-white py-2 px-4 rounded-lg mx-auto"
              data-modal-hide={targetID}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
