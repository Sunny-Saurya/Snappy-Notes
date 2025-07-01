import React from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = React.useState(noteData?.title || "");
  const [content, setContent] = React.useState(noteData?.content || "");
  const [tags, setTags] = React.useState(noteData?.tags || []);

  const [error, setError] = React.useState(null);

  // Add a new note
  const addNewNote = async () => {
    try{
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if(response.data && response.data.note){
        showToastMessage("Note Added Successfully");
        getAllNotes();  
        onClose();
      }

    }
    catch(error){
      if(
        error.response && error.response.data && error.response.data.message
      ){
        setError(error.response.data.message);
      }
    }

  };

  // Edit an existing note
  const editNote = async () => {
    const noteId = noteData._id;
    try{
      const response = await axiosInstance.post("/edit-note/"+ noteId , {
        title,
        content,
        tags,
      });

      if(response.data && response.data.note){
        showToastMessage("Note Updated Successfully");
        getAllNotes();  
        onClose();
      }

    }
    catch(error){
      if(
        error.response && error.response.data && error.response.data.message
      ){
        setError(error.response.data.message);
      }
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
      editNote(); // Update existing note
    } else if (type === "add") {
      addNewNote(); // Add new note
    }
  };
  

  return (
    <div className="relative p-5 bg-white shadow-md rounded-md">
      {/* Close Button */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPTION</label>
        <textarea
          type="text"
          className="text-slate-950 text-sm outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Tags Input */}
      <div className="mt-3">
        <label htmlFor="tags" className="input-label">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Add Button */}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "EDIT" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
