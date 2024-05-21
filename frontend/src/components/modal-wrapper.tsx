import React, { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  children: ReactNode, 
  onCloseModal: () => void;
}

const ModalWrapper: React.FC<ModalProps> = ({onCloseModal, children}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-1 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onCloseModal}
              >
                <AiOutlineClose size={25} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="backdrop-filter backdrop-blur-sm md:backdrop-blur-lg fixed inset-0 z-40"></div>
    </>
  );
};

export default ModalWrapper;
