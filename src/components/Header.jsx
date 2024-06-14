import React from "react";
import logo from "../Media/Prathamesh_Logo.png"; // Adjust the path as needed

const Header = () => {
  return (
    <header className="bg-blue-500 py-4 border">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-1">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Weather App Logo"
            className="h-14 rounded-lg w-auto md:w-20 mr-2"
          />
          <h1 className="text-white text-2xl font-bold hidden md:block">
            Weather App
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4 text-white">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
