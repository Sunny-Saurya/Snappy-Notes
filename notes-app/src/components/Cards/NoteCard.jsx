import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";
import { motion } from "framer-motion";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,  
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`border border-gray-700 rounded-lg p-4 transition-all ease-in-out relative overflow-hidden 
        ${isPinned ? "bg-gradient-to-br from-[#1E1E2A] to-[#2D2D3A]" : "bg-[#1A1A1A]"}`}
    >
      {/* Pin indicator ribbon */}
      {isPinned && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-6 bg-gradient-to-r from-purple-600 to-blue-600 transform rotate-45 translate-x-8 -translate-y-2 flex items-center justify-center">
            <span className="text-xs font-bold text-white">PINNED</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div>
          <h6 className="text-base font-semibold text-white">{title}</h6>
          <span className="text-xs text-gray-400">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPinNote}
          className={`p-1 rounded-full ${isPinned ? "text-purple-400" : "text-gray-500 hover:text-gray-300"}`}
        >
          <MdOutlinePushPin className="text-xl" />
        </motion.button>
      </div>

      <p className="text-sm text-gray-300 mb-4">
        {content?.slice(0, 100)}{content?.length > 100 ? "..." : ""}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="flex flex-wrap gap-1">
          {tags.map((item, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-[#0D0D0D] text-purple-300"
            >
              #{item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700"
          >
            <MdCreate className="text-lg" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-red-400 hover:bg-gray-700"
          >
            <MdDelete className="text-lg" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;