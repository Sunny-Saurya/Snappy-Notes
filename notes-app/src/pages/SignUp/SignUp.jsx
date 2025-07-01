import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from "../../utils/axiosInstance";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error && (name || email || password)) {
      setError(null);
    }
  }, [name, email, password, error]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name) {
      setError("Please enter your name");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter a password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/createAccount", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        setIsLoading(false);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setSuccessMessage("Account created successfully! Redirecting...");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans">
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 py-6 border-b border-gray-800"
      >
        <h1 className="text-2xl font-bold">Snappy Notes</h1>
        <Link 
          to="/login" 
          className="px-4 py-2 text-sm border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
        >
          Login
        </Link>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1A1A] rounded-xl shadow-lg border border-gray-800 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold"
              >
                Join <b>Snappy Notes</b>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-purple-200"
              >
                Create your account to get started
              </motion.p>
            </div>

            <div className="p-8">
              {successMessage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.8 }}
                    className="text-green-400 mb-4 text-5xl"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-xl font-semibold">
                    {successMessage}
                  </h3>
                  <div className="mt-6">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full animate-pulse" 
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSignup}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 pl-10 bg-[#0D0D0D] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 pl-10 bg-[#0D0D0D] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-500" />
                    </div>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-[#0D0D0D] border-gray-700 focus:ring-purple-500"
                      placeholder="Create Password"
                    />
                  </motion.div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm p-2 bg-red-900 bg-opacity-20 rounded"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        Create Account
                        <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-purple-400 font-medium hover:text-purple-300 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1A1A1A] text-gray-500">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-[#0D0D0D] text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <FaGoogle className="mr-2 text-red-500" />
                    Google
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-[#0D0D0D] text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <FaFacebook className="mr-2 text-blue-500" />
                    Facebook
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;