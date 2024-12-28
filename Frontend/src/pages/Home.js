import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-green-500 p-4">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/150x50?text=Logo"
            alt="Logo"
            className="h-12"
          />
        </div>
        <ul className="flex space-x-6 text-white font-medium">
          <li>
            <Link to="/courses" className="hover:underline">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="hover:underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-blue-100 to-green-100 min-h-screen px-6 py-10">
        {/* Left Content */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Learn without limits
          </h1>
          <p className="text-gray-700 mb-6">
            Start, switch, or advance your career with more than 7,000 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Illustration"
            className="rounded-lg border border-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
