import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        {/* Social Media Icons (Using simple text characters as placeholders) */}
        <div className="flex gap-4 text-gray-700 mb-4 sm:mb-0 text-xl">
          <a href="#" className="w-6 h-6 hover:text-purple-600 transition">
            X
          </a>
          <a href="#" className="w-6 h-6 hover:text-purple-600 transition">
            📸
          </a>
          <a href="#" className="w-6 h-6 hover:text-purple-600 transition">
            ▶️
          </a>
          <a href="#" className="w-6 h-6 hover:text-purple-600 transition">
            💼
          </a>
        </div>

        {/* Contact Details */}
        <div className="text-right text-sm text-gray-700 space-y-1">
          <p>
            <strong className="font-semibold">Email:</strong>{" "}
            campuslearn@belgiumcampus.ac.za
          </p>
          <p>
            <strong className="font-semibold">Phone:</strong> 010 593 5368
          </p>
          <p>
            <strong className="font-semibold">Address:</strong> 138 Berg Ave,
            Heatherdale AH, Akasia, 0182
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
