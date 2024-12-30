import { X } from "lucide-react";
import { ReactNode } from "react";

type ModalProps = {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
};

const Modal = ({ onClose, open, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-fit flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-end p-2">
          <div className="flex justify-end ">
            <button
              className="text-gray-600  hover:text-gray-300 focus:text-gray-400"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
