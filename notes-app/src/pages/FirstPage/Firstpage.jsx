import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from "./Reflect.jpeg"

const LandingPage = () => {
  return (
    <div className="relative min-h-screen font-sans">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10 text-white bg-black/60 backdrop-blur-sm min-h-screen">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">Snappy Notes</h1>
          <div className="flex gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 text-sm bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              The Easiest Way 
              <br />
              <span className="text-purple-400">to Remember Everything</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Your digital notebook for everything that matters.
              <br />
              From thoughts to to-dos, keep it all in one place.
            </p>
            <Link 
              to="/signup"
              className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Simple Method Section */}
        <div className="bg-[#1A1A1A] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Method</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Capture your ideas the moment they strike.
              <br />
              Organize, edit, and revisit them anytime.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0D0D0D] p-6 rounded-lg border border-gray-800">
                <div className="text-purple-400 text-2xl font-bold mb-2">1</div>
                <h3 className="text-xl font-semibold mb-2">Sign Up / Login</h3>
                <p className="text-gray-400">
                  Create your account or log in to access your personal note space.
                </p>
              </div>
              <div className="bg-[#0D0D0D] p-6 rounded-lg border border-gray-800">
                <div className="text-purple-400 text-2xl font-bold mb-2">2</div>
                <h3 className="text-xl font-semibold mb-2">Create Notes</h3>
                <p className="text-gray-400">
                  Quickly jot down thoughts, tasks, or ideas in a clean, minimal editor.
                </p>
              </div>
              <div className="bg-[#0D0D0D] p-6 rounded-lg border border-gray-800">
                <div className="text-purple-400 text-2xl font-bold mb-2">3</div>
                <h3 className="text-xl font-semibold mb-2">Edit/Delete</h3>
                <p className="text-gray-400">
                  Update or remove notes anytime with just a click—fully in your control.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#0B0B0B] py-12 px-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Snappy Notes</h2>
              <p className="text-gray-400">Your Digital Notebook for a Smarter You</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            © 2025 Snappy Notes. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
