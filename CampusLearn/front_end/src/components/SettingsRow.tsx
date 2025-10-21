import React from 'react';

// Lightweight stub: kept for layout compatibility only. Notification-related UI was removed from the app.
const SettingsRow: React.FC<{ label?: string }> = ({ label }) => {
  return (
    <div className="w-full p-2 text-sm text-gray-300">{label ?? ''}</div>
  );
};

export default SettingsRow;