import React from "react";

const EmptyCard = ({ message = "You have no notes yet! Start by adding one below. If you have notes, they will appear here." }) => {
  return (
    <div className="emptyCard flex items-center ml-96 justify-center h-screen w-full gap-10">
    <div className="w-[100%] ml-96 ">
    <svg fill="#ebcb00" height="250px" width="250px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve" stroke="#ebcb00"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M364.296,368.179V63.958c0.001-10.345-8.386-18.732-18.731-18.732h-54.269l-84.601,84.6 c-7.315,7.315-19.175,7.317-26.49,0c-7.315-7.315-7.315-19.175,0-26.49l58.109-58.109H41.346 c-10.345,0-18.732,8.387-18.732,18.732v304.22c0,10.345,8.387,18.732,18.732,18.732h304.219 C355.91,386.91,364.296,378.523,364.296,368.179z"></path> <path d="M470.656,170.317h-75.139c-6.897,0-12.488,5.591-12.488,12.488v185.374c0,20.691-16.774,37.463-37.463,37.463H160.192 c-6.897,0-12.488,5.591-12.488,12.488v75.139c0,10.345,8.387,18.732,18.732,18.732h304.219c10.345,0,18.732-8.387,18.732-18.732 v-304.22C489.388,178.704,481.001,170.317,470.656,170.317z"></path> <path d="M304.546,5.487c-7.313-7.315-19.175-7.315-26.49,0l-39.74,39.74h52.981l13.25-13.25 C311.861,24.663,311.861,12.802,304.546,5.487z"></path> </g> </g> </g> </g></svg>
      <p className=" mr-96 w-3/4 text-center text-slate-600 text-lg font-medium leading-6">
        {message}
      </p>
      {/* <button
        onClick={() => console.log("Navigate to Add Note")}
        className="mt-4 px-6 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-yellow-600 transition-all duration-200"
      >
        Add Your First Notex  
      </button> */}
    </div>
    </div>
  );
};

export default EmptyCard;
