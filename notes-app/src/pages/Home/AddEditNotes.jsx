import React, { useEffect } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { motion } from "framer-motion";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // ✅ Reset state when modal opens or noteData changes
  useEffect(() => {
    setTitle(noteData?.title || "");
    setContent(noteData?.content || "");
    setTags(noteData?.tags || []);
    setError(null);
  }, [noteData]);

  const addNewNote = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data?.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const editNote = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });

      if (response.data?.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter content");
      return;
    }

    setError(null);

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="relative p-6 bg-[#1A1A1A] rounded-xl border border-gray-800 shadow-2xl max-w-2xl w-full"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-800 hover:bg-gray-700 transition-colors"
        onClick={onClose}
      >
        <MdClose className="text-xl text-gray-400 hover:text-white" />
      </motion.button>

      {/* Title Input */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-medium text-gray-400">TITLE</label>
        <input
          type="text"
          className="text-2xl bg-[#0D0D0D] text-white outline-none p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          placeholder="Go To Gym"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-medium text-gray-400">DESCRIPTION</label>
        <textarea
          className="bg-[#0D0D0D] text-white text-sm outline-none p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all min-h-[200px]"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Tags Input */}
      <div className="mb-6">
        <label htmlFor="tags" className="text-sm font-medium text-gray-400 block mb-2">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} darkMode />
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm p-2 bg-red-900 bg-opacity-20 rounded mb-4"
        >
          {error}
        </motion.p>
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          isSubmitting
            ? "bg-gray-700 text-gray-400"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg"
        }`}
        onClick={handleAddNote}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : type === "edit" ? (
          "UPDATE NOTE"
        ) : (
          "ADD NOTE"
        )}
      </motion.button>
    </motion.div>
  );
};

export default AddEditNotes;
