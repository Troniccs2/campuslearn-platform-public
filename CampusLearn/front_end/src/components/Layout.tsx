import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  variant = "dark",
  showFooter = true,
}) => {
  const backgroundClass =
    variant === "light"
      ? "bg-gradient-to-br from-purple-50 via-white to-indigo-50"
      : "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900";

  return (
    // 🌟 Main Container: min-h-screen and flex-col for sticky footer 🌟
    <div className={`min-h-screen ${backgroundClass} relative overflow-hidden`}>
                  {/* Animated background elements (Low z-index) */}     {" "}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
               {" "}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
               {" "}
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
               {" "}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
             {" "}
      </div>
                 {" "}
      {/* 🌟 Content Wrapper: This div holds the Header, main, and Footer 🌟
         It is given flex-grow to stretch and z-10 for stacking. 
           NOTE: The outer div is already 'flex flex-col', but we ensure
           this wrapper also fills the remaining space with 'flex-grow'.
           Adding 'flex flex-col' here is often needed to manage the inner flow correctly.
      */}
           {" "}
      <div className="flex flex-col flex-grow relative z-10">
                      <Header />             {" "}
        {/* Main Content: Use flex-grow for space filling and w-full for correct centering */}
               {" "}
        <main className="flex-grow max-w-4xl mx-auto py-4 px-4 space-y-6 w-full">
                    {children}       {" "}
        </main>
                      {showFooter && <Footer />}     {" "}
      </div>
         {" "}
    </div>
  );
};

export default Layout;
