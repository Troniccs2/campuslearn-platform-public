import React from "react";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-white to-purple-50 p-8 rounded-2xl shadow-2xl border border-purple-200 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        {/* Enhanced Social Media Icons */}
        <div className="flex gap-6 mb-6 sm:mb-0">
          <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaTwitter className="text-lg" />
          </a>
          <a href="#" className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaInstagram className="text-lg" />
          </a>
          <a href="#" className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaYoutube className="text-lg" />
          </a>
          <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaLinkedin className="text-lg" />
          </a>
        </div>

        {/* Enhanced Contact Details */}
        <div className="text-right text-sm text-gray-700 space-y-3">
          <div className="flex items-center justify-end gap-2">
            <FaEnvelope className="text-purple-600" />
            <span>
              <strong className="font-semibold text-purple-800">Email:</strong>{" "}
              campuslearn@belgiumcampus.ac.za
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <FaPhone className="text-purple-600" />
            <span>
              <strong className="font-semibold text-purple-800">Phone:</strong> 010 593 5368
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <FaMapMarkerAlt className="text-purple-600" />
            <span>
              <strong className="font-semibold text-purple-800">Address:</strong> 138 Berg Ave,
              Heatherdale AH, Akasia, 0182
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
