import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000); // Automatically close the toast after 3 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-500 ease-in-out transform ${
        isShown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      }`}
    >
      <div
        className={`min-w-[250px] bg-white border shadow-2xl rounded-md relative flex items-center gap-3 p-4 after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:left-0 after:top-0 after:rounded-l-md`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            type === "delete" ? "bg-red-50" : "bg-green-50"
          }`}
        >
          {type === "delete" ? (
            <MdDelete className="text-xl text-red-500" />
          ) : (
            <LuCheck className="text-xl text-green-500" />
          )}
        </div>
        <p className="text-sm text-slate-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;