import React from "react";
import { FaUsers, FaRobot, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

const AboutPage: React.FC = () => {
  return (
    <Layout variant="dark" showFooter={false}>
      <BackButton to="/" label="Back to Home" />

        {/* About Us & Contact Us Header Card (The large purple banner) */}
        <div
          className="rounded-xl shadow-xl overflow-hidden border-4 border-purple-900"
          style={{
            backgroundImage: `linear-gradient(to right, #9333ea, #a855f7)`,
          }}
        >
          <div className="flex items-center justify-between p-4 h-40">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <FaUsers className="text-purple-600 text-3xl" />
            </div>
            <div className="flex flex-col text-white text-right">
              <h2 className="text-4xl font-extrabold tracking-tight">
                About Us & <br /> Contact Us
              </h2>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-purple-900 space-y-4">
          {/* About Campus Learn */}
          <div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">
              About Campus Learn
            </h3>
            <p className="text-sm text-gray-700">
              Campus Learn is a modern, AI-enhanced Tutor-Student Relations
              Management System (TSRMS) dedicated to optimizing the academic
              journey. We bridge the gap between students and tutors, making
              personalized, effective learning support accessible to everyone.
            </p>
          </div>

          {/* Our Mission */}
          <div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">
              Our Mission
            </h3>
            <p className="text-sm text-gray-700">
              Our mission is to foster academic success by providing a seamless,
              intelligent platform that supports collaboration and personalized
              learning. We believe that technology should empower both educators
              and students to achieve their full potential.
            </p>
          </div>

          {/* Microsoft Copilot Card (Internal to the main card) */}
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center border border-gray-300">
            <div>
              <h4 className="text-lg font-bold text-purple-900">
                MICROSOFT COPILOT
              </h4>
              <p className="text-sm text-purple-600 font-semibold">
                Your Everyday AI Assistant.
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
              <FaRobot className="text-purple-600 text-2xl" />
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-2xl font-extrabold text-purple-900 mb-2">
              CONTACT US
            </h3>
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-700 space-y-1">
                <p>Email: campuslearn@belgiumcampus.ac.za</p>
                <p>Phone: 010 593 5368</p>
                <p>Address: 138 Berg Ave, Heatherdale AH, Akasia, 0182</p>
              </div>
              {/* Contact Icons */}
              <div className="flex gap-2 text-purple-600">
                <FaMapMarkerAlt className="w-6 h-6" />
                <FaPhone className="w-6 h-6" />
                <FaEnvelope className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Footer Card (The black/dark one in the image) */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-4">
          <div className="flex justify-between items-center text-white">
            <div className="flex gap-3 text-lg">
              <FaTwitter className="w-6 h-6 hover:opacity-75 transition cursor-pointer" />
              <FaInstagram className="w-6 h-6 hover:opacity-75 transition cursor-pointer" />
              <FaYoutube className="w-6 h-6 hover:opacity-75 transition cursor-pointer" />
              <FaLinkedin className="w-6 h-6 hover:opacity-75 transition cursor-pointer" />
            </div>
            <div className="text-right text-xs text-gray-300">
              <p>Email: campuslearn@belgiumcampus.ac.za</p>
              <p>Address: 138 Berg Ave, Heatherdale AH, Akasia, 0182</p>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default AboutPage;
