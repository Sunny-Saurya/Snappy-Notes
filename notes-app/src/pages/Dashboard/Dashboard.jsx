import React from "react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 leading-tight">
        Welcome to the Dashboard
      </h1>
      <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl">
        This is the main page of your application. It's clean, responsive, and adjusts smoothly across all screen sizes.
      </p>
    </div>
  );
}
