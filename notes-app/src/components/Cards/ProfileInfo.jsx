import React from 'react';
import { getInitials } from '../../utils/helper';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-4"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium">
        {getInitials(userInfo?.fullName || 'User')}
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium text-white">
          {userInfo?.fullName || 'User'}
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 transition-colors mt-1"
        >
          <FiLogOut size={14} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileInfo;