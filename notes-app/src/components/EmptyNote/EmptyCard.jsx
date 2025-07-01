import React from "react";
import { motion } from "framer-motion";
import { MdNoteAdd } from "react-icons/md";

const EmptyCard = ({ message = "You have no notes yet! Start by adding one below. If you have notes, they will appear here." }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full p-4"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <svg 
          fill="url(#gradient)" 
          height="200px" 
          width="200px" 
          viewBox="0 0 512.001 512.001"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <g>
            <path d="M364.296,368.179V63.958c0.001-10.345-8.386-18.732-18.731-18.732h-54.269l-84.601,84.6 c-7.315,7.315-19.175,7.317-26.49,0c-7.315-7.315-7.315-19.175,0-26.49l58.109-58.109H41.346 c-10.345,0-18.732,8.387-18.732,18.732v304.22c0,10.345,8.387,18.732,18.732,18.732h304.219 C355.91,386.91,364.296,378.523,364.296,368.179z"></path>
            <path d="M470.656,170.317h-75.139c-6.897,0-12.488,5.591-12.488,12.488v185.374c0,20.691-16.774,37.463-37.463,37.463H160.192 c-6.897,0-12.488,5.591-12.488,12.488v75.139c0,10.345,8.387,18.732,18.732,18.732h304.219c10.345,0,18.732-8.387,18.732-18.732 v-304.22C489.388,178.704,481.001,170.317,470.656,170.317z"></path>
            <path d="M304.546,5.487c-7.313-7.315-19.175-7.315-26.49,0l-39.74,39.74h52.981l13.25-13.25 C311.861,24.663,311.861,12.802,304.546,5.487z"></path>
          </g>
        </svg>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-400 text-lg font-medium max-w-md mx-auto mb-8 leading-relaxed"
      >
        {message}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all"
      >
        <MdNoteAdd className="text-xl" />
        Add Your First Note
      </motion.button>
    </motion.div>
  );
};

export default EmptyCard;