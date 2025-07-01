// import React, { useEffect } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import NoteCard from "../../components/Cards/NoteCard";
// import moment from "moment";
// import { MdAdd } from "react-icons/md";
// import AddEditNotes from "./AddEditNotes";
// import Modal from "react-modal";
// import { useState } from "react";
// import TagInput from "../../components/Input/TagInput";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Toast from "../../components/ToastMessage/Toast";
// import EmptyCard from "../../components/EmptyNote/EmptyCard";
// import "../../index.css"; // Import your CSS file for styles

// const Home = () => {
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const[showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     message: "",
//     type: "add",
//     data: null,

//   });

//   const [allNotes, setAllNotes] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);

//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = async (noteDetails) => {
//     setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
//     console.log(noteDetails); // Log to check if correct note is passed
//   };
  

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({isShown: true,
//        message,
//        type,

//        });
//   };

//   const handleCloseToast = () => {
//     setShowToastMsg({isShown: false,
//       message: "",
//     });
//   };

//   // get user info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//         console.log(response.data.user);
//       }
//     } catch (error) {
//       if (error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // get all notes

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");
//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again later.");
//     }
//   };

//   // delete note
//   const deleteNode = async (data) => {
//     const noteId = data._id;
//     try{
//       const response = await axiosInstance.delete("/delete-note/"+ noteId);

//       if(response.data && !response.data.error){
//         showToastMessage("Note Deleted Successfully", 'delete');

//         getAllNotes();  
//       }

//     }
//     catch(error){
//       if(
//         error.response && error.response.data && error.response.data.message
//       ){
//         console.log("An unexpected error occurred. Please try again later.");
//       }
//     }

//   }

//   // search for a note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", {
//         params: { query } // Correctly pass query to the API
//       });
  
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again later.");
//     }
//   };

//   const onSerachNote = async (noteData) => {
    
//   }

//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   }
  

//   useEffect(() => {
//     getAllNotes();
//     getUserInfo();
//     return () => {};
//   }, []);

//   return (
//     <>
//   <div className="neon-bg" />
//   <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

//   <div className="container mx-auto relative z-10">
//     <div className="grid grid-cols-3 gap-4 mt-8">
//       {Array.isArray(allNotes) && allNotes.length > 0 ? (
//         allNotes.map((item) => (
//           <NoteCard
//             key={item._id}
//             title={item.title}
//             content={item.content}
//             date={item.createdon}
//             tags={item.tags}
//             isPinned={item.isPinned}
//             onEdit={() => handleEdit(item)}
//             onDelete={() => deleteNode(item)}
//             onPinNote={() => {}}
//           />
//         ))
//       ) : (
//         <EmptyCard />
//       )}
//     </div>
//   </div>

//       <button
//         className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500 hover:bg-purple-600 absolute right-10 bottom-10"
//         onClick={() => {
//           setOpenAddEditModal({
//             isShown: true,
//             type: "add",
//             data: null,
//           });
//         }}
//       >
//         <MdAdd className="text-[32px] text-white" />
//       </button>

//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//           },
//         }}
//         contentLabel=""
//         className="w-[40%] max-h-3.4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
//       >
//         <AddEditNotes
//           type={openAddEditModal.type}
//           noteData={openAddEditModal.data}
//           onClose={() => {
//             setOpenAddEditModal({
//               isShown: false,
//               type: "add",
//               data: null,
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage = {showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type = {showToastMsg.type}
//         onClose={handleCloseToast}
//         />
//     </>
//   );
// };

// export default Home;


import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import moment from "moment";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyNote/EmptyCard";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const[showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
    data: null,

  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = async (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    console.log(noteDetails); // Log to check if correct note is passed
  };
  

  const showToastMessage = (message, type) => {
    setShowToastMsg({isShown: true,
       message,
       type,

       });
  };

  const handleCloseToast = () => {
    setShowToastMsg({isShown: false,
      message: "",
    });
  };

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again later.");
    }
  };

  // delete note
  const deleteNode = async (data) => {
    const noteId = data._id;
    try{
      const response = await axiosInstance.delete("/delete-note/"+ noteId);

      if(response.data && !response.data.error){
        showToastMessage("Note Deleted Successfully", 'delete');

        getAllNotes();  
      }

    }
    catch(error){
      if(
        error.response && error.response.data && error.response.data.message
      ){
        console.log("An unexpected error occurred. Please try again later.");
      }
    }

  }

  // search for a note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query } // Correctly pass query to the API
      });
  
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again later.");
    }
  };

  const onSerachNote = async (noteData) => {
    
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }
  

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch= {handleClearSearch} />

      <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-8">
  {Array.isArray(allNotes) && allNotes.length > 0 ? (
    allNotes.map((item) => (
      <NoteCard
        key={item._id}
        title={item.title}
        content={item.content}
        date={item.createdon}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={() => handleEdit(item)}
        onDelete={() => deleteNode(item)}
        onPinNote={() => {}}
      />
    ))
  ) : (
    // <p className="text-center col-span-3">No notes available.</p>
    <EmptyCard/>
  )}
</div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500 hover:bg-purple-700 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="texst-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3.4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage = {showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type = {showToastMsg.type}
        onClose={handleCloseToast}
        />
    </>
  );
};

export default Home;