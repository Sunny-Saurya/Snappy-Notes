import React from "react";
import { CheckCircle, Star } from "lucide-react"; // Import other icons from lucide-react
import { Link } from "react-router-dom"; 


const FirstPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-yellow-500">Snappy Notes</h1>
        <ul className="flex gap-4">
          <li><a href="#features" className="text-gray-700 hover:text-yellow-500">Why Snappy Notes</a></li>
          <li><a href="#pricing" className="text-gray-700 hover:text-yellow-500">Pricing</a></li>
          <li><a href="#help" className="text-gray-700 hover:text-yellow-500">Help</a></li>
        </ul>
        <Link to="/login">
      <button className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md">
        Get Started
      </button>
    </Link>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            The Ultimate Note-Taking App for Productivity
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Snappy Notes combines powerful features and an intuitive interface to make note-taking seamless and enjoyable. Organize your ideas effortlessly across all your devices.
          </p>
          <Link to= "/signup">
          <button className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-2 rounded-md text-lg">
            Start Your Journey
          </button>
          </Link>
        </div>
        <img
          src=""
          alt="Snappy Notes Preview"
          className="w-full md:w-1/2 mt-8 md:mt-0 rounded-lg shadow-md"
        />
      </header>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Why Choose Snappy Notes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border p-4 shadow-lg">
            <div className="flex flex-col items-center">
              <CheckCircle className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud Sync</h3>
              <p className="text-gray-600 text-center">
                Access your notes anywhere with seamless synchronization across devices.
              </p>
            </div>
          </div>
          <div className="border p-4 shadow-lg">
            <div className="flex flex-col items-center">
              <Star className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Focus Mode</h3>
              <p className="text-gray-600 text-center">
                Eliminate distractions and focus on what matters most with our intuitive editor.
              </p>
            </div>
          </div>
          <div className="border p-4 shadow-lg">
            <div className="flex flex-col items-center">
              <CheckCircle className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable Themes</h3>
              <p className="text-gray-600 text-center">
                Personalize your workspace with a variety of themes to suit your style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <br /><br /><br /> <br />
      <footer className="bg-gray-900 text-white py-8 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4">Snappy Notes</h3>
            <p className="text-gray-400">Take notes, stay organized, and achieve more.</p>
          </div>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-yellow-500">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-yellow-500">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-yellow-500">Support</a>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-6">© 2024 Snappy Notes. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default FirstPage;
