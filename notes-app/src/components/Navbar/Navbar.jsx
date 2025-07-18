// import React from 'react';
// import ProfileInfo from '../Cards/ProfileInfo';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const navigate = useNavigate();

//   // Logout handler
//   const onLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   // Search handler (to be implemented based on your needs)
//   const handleSearch = () => {
//     // You can filter notes or make an API call to search here
//     if(searchQuery){
//       onSearchNote(searchQuery);
//     }
//   };

//   // Clear search input
//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   return (
    
//     <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-sm">
//       <h2 className="text-xl font-medium text-black py-2">Notes</h2>

//       <SearchBar 
//   value={searchQuery} 
//   onChange={({ target }) => setSearchQuery(target.value)} // update search query
//   handleSearch={handleSearch} // Correctly call handleSearch
//   onClearSearch={onClearSearch} 
// />

//       <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
//     </div>
//   );
// };

// export default Navbar;


// import React from 'react';
// import ProfileInfo from '../Cards/ProfileInfo';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';

// // Example inline SVG (replace with your actual logo)
// const Logo = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
// <circle cx="77" cy="13" r="1" fill="#f1bc19"></circle><circle cx="50" cy="50" r="37" fill="#e4e4f9"></circle><circle cx="83" cy="15" r="4" fill="#f1bc19"></circle><circle cx="87" cy="24" r="2" fill="#8889b9"></circle><circle cx="81" cy="76" r="2" fill="#fbcd59"></circle><circle cx="15" cy="63" r="4" fill="#fbcd59"></circle><circle cx="25" cy="87" r="2" fill="#8889b9"></circle><circle cx="23.5" cy="67.5" r="2.5" fill="#fff"></circle><circle cx="77.5" cy="30.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M66.719,73H35.281C31.26,73,28,69.74,28,65.719V34.281C28,30.26,31.26,27,35.281,27h31.438 C70.74,27,74,30.26,74,34.281v31.438C74,69.74,70.74,73,66.719,73z"></path><path fill="#ffce00" d="M74,39v-5.279C74,30.009,70.74,27,66.719,27H35.281C31.26,27,28,30.009,28,33.721V39H74z"></path><path fill="#472b29" d="M66.719,73.7H35.281c-4.401,0-7.981-3.58-7.981-7.981V34.281c0-4.401,3.581-7.981,7.981-7.981 h31.438c4.401,0,7.981,3.58,7.981,7.981v31.438C74.7,70.12,71.12,73.7,66.719,73.7z M35.281,27.7 c-3.629,0-6.581,2.952-6.581,6.581v31.438c0,3.629,2.952,6.581,6.581,6.581h31.438c3.629,0,6.581-2.952,6.581-6.581V34.281 c0-3.629-2.952-6.581-6.581-6.581H35.281z"></path><path fill="#472b29" d="M31.5,36.167c-0.276,0-0.5-0.224-0.5-0.5v-0.333C31,32.393,33.393,30,36.333,30h14 c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5h-14C33.944,31,32,32.944,32,35.333v0.333C32,35.943,31.776,36.167,31.5,36.167z"></path><path fill="#472b29" d="M42.583,70h-6.25C33.393,70,31,67.607,31,64.667V41.333c0-0.276,0.224-0.5,0.5-0.5 s0.5,0.224,0.5,0.5v23.333C32,67.056,33.944,69,36.333,69h6.25c0.276,0,0.5,0.224,0.5,0.5S42.86,70,42.583,70z"></path><path fill="#472b29" d="M65.667,70h-19.75c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h19.75 C68.056,69,70,67.056,70,64.667V41.583c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v23.083C71,67.607,68.607,70,65.667,70z"></path><path fill="#472b29" d="M70.5,36.167c-0.276,0-0.5-0.224-0.5-0.5v-0.333C70,32.944,68.056,31,65.667,31h-2.75 c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2.75C68.607,30,71,32.393,71,35.333v0.333C71,35.943,70.776,36.167,70.5,36.167z"></path><path fill="#472b29" d="M59.5,31h-6.25c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h6.25c0.276,0,0.5,0.224,0.5,0.5 S59.776,31,59.5,31z"></path><path fill="#472b29" d="M34.5,39h-6.25c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h6.25c0.276,0,0.5,0.224,0.5,0.5 S34.776,39,34.5,39z"></path><path fill="#472b29" d="M74,39H37.25c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H74c0.276,0,0.5,0.224,0.5,0.5 S74.276,39,74,39z"></path><path fill="#472b29" d="M60.5,50.75h-32c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h32 c0.138,0,0.25,0.112,0.25,0.25S60.638,50.75,60.5,50.75z"></path><path fill="#472b29" d="M73.5,50.75H63c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h10.5 c0.138,0,0.25,0.112,0.25,0.25S73.638,50.75,73.5,50.75z"></path><path fill="#472b29" d="M73.5,60.75H49c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h24.5 c0.138,0,0.25,0.112,0.25,0.25S73.638,60.75,73.5,60.75z"></path><path fill="#472b29" d="M46,60.75H28c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h18c0.138,0,0.25,0.112,0.25,0.25 S46.138,60.75,46,60.75z"></path><circle cx="34.5" cy="41.5" r=".5" fill="#472b29"></circle><circle cx="37.5" cy="41.5" r=".5" fill="#472b29"></circle><circle cx="40.5" cy="41.5" r=".5" fill="#472b29"></circle><circle cx="43.5" cy="41.5" r=".5" fill="#472b29"></circle><g><circle cx="46.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="49.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="52.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="55.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="58.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="61.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="64.5" cy="41.5" r=".5" fill="#472b29"></circle></g><g><circle cx="67.5" cy="41.5" r=".5" fill="#472b29"></circle></g>
// </svg>
// );

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const navigate = useNavigate();

//   // Logout handler
//   const onLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   // Search handler (to be implemented based on your needs)
//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   // Clear search input
//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   return (
//     <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-sm">
//       {/* Logo and title */}
//       <div className="flex items-center space-x-1">
//         <Logo /> {/* Logo component */}
//         <h2 className="text-xl font-medium text-black py-2">Snappy Notes</h2>
//       </div>

//       <SearchBar
//         value={searchQuery}
//         onChange={({ target }) => setSearchQuery(target.value)} // update search query
//         handleSearch={handleSearch} // Correctly call handleSearch
//         onClearSearch={onClearSearch}
//       />

//       <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
//     </div>
//   );
// };

// export default Navbar;


import React from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { motion } from 'framer-motion';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0B0B0B]  flex items-center justify-between px-8 py-4 border-b border-gray-800"
    >
      {/* Logo and title */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center space-x-3"
      >
        
        <div className="text-xl font-bold text-white">Snappy Notes</div>
      </motion.div>

      {/* Search bar centered */}
      <div className="flex-1 max-w-xl mx-6">
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
          darkMode={true}
        />
      </div>

      {/* Profile section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <ProfileInfo 
          userInfo={userInfo} 
          onLogout={onLogout} 
          darkMode={true}
        />
      </motion.div>
    </motion.div>
  );
};

export default Navbar;