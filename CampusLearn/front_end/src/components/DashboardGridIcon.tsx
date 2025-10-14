// src/components/DashboardGridIcon.tsx

import React from 'react';

// Define the properties (props) that this component will accept
interface DashboardGridIconProps {
  title: string;
  // This could be a React component (e.g., an SVG icon imported from 'lucide-react' or similar)
  // For simplicity, we'll use a placeholder for now.
  Icon: React.ElementType; 
  href: string; // The link the tile should navigate to
}

const DashboardGridIcon: React.FC<DashboardGridIconProps> = ({ title, Icon, href }) => {
  return (
    <a 
      href={href}
      // Tailwind classes for the styling
      className="
        flex flex-col items-center justify-center 
        p-4 sm:p-6 h-36 w-full 
        rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.03]
        bg-gradient-to-br from-[#8A2BE2] to-[#4B0082] 
        text-white cursor-pointer
      "
    >
      <div className="text-4xl mb-2">
        {/* The Icon component is rendered here. Adjust size based on your actual icon library */}
        <Icon className="w-10 h-10 stroke-current text-white" />
      </div>
      <span className="text-base font-semibold text-center uppercase tracking-wider">
        {title}
      </span>
    </a>
  );
};

export default DashboardGridIcon;