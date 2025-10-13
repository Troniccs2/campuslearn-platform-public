import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
// The About page image shows the contact details integrated into the main content,
// so we'll treat them as part of this page, not using the general Footer component.

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#212121" }}>
      <Header />

      {/* Changed max-w-md to max-w-4xl for wider cards on larger screens */}
      <main className="max-w-4xl mx-auto py-4 px-4 space-y-4">
        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Home</span>
          </button>
        </div>

        {/* About Us & Contact Us Header Card (The large purple banner) */}
        <div
          className="rounded-xl shadow-xl overflow-hidden border-4 border-purple-900"
          style={{
            backgroundImage: `linear-gradient(to right, #9333ea, #a855f7)`,
          }}
        >
          <div className="flex items-center justify-between p-4 h-40">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="/images/about-main-graphic.png" // Placeholder for the main about graphic
                alt="About Us Main Graphic"
                className="max-w-full max-h-full object-contain"
              />
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
              <img
                src="/images/copilot-graphic.png" // Placeholder for Copilot graphic
                alt="Copilot Icon"
                className="max-w-full max-h-full object-contain"
              />
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
              {/* Contact Icons (Address/Phone/Email images) */}
              <div className="flex gap-2 text-purple-600">
                <img
                  src="/images/location-icon.png"
                  alt="Location"
                  className="w-6 h-6"
                />
                <img
                  src="/images/phone-icon.png"
                  alt="Phone"
                  className="w-6 h-6"
                />
                <img
                  src="/images/email-icon.png"
                  alt="Email"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Footer Card (The black/dark one in the image) */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-4">
          <div className="flex justify-between items-center text-white">
            <div className="flex gap-3 text-lg">
              <img
                src="/images/social-x.png"
                alt="X"
                className="w-6 h-6 hover:opacity-75 transition"
              />
              <img
                src="/images/social-instagram.png"
                alt="Instagram"
                className="w-6 h-6 hover:opacity-75 transition"
              />
              <img
                src="/images/social-youtube.png"
                alt="YouTube"
                className="w-6 h-6 hover:opacity-75 transition"
              />
              <img
                src="/images/social-linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6 hover:opacity-75 transition"
              />
            </div>
            <div className="text-right text-xs text-gray-300">
              <p>Email: campuslearn@belgiumcampus.ac.za</p>
              <p>Address: 138 Berg Ave, Heatherdale AH, Akasia, 0182</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
