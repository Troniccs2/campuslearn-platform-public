import React from 'react';

interface Props {
  name: string;
  lastMessage?: string;
  updatedAt?: string;
  onClick?: () => void;
}

const ConversationPreviewCard: React.FC<Props> = ({ name, lastMessage = '', updatedAt = '', onClick }) => {
  const snippet = lastMessage.length > 120 ? lastMessage.substring(0, 117) + '...' : lastMessage;
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-4 p-4 rounded-xl bg-purple-800/30 border border-purple-600/30 hover:bg-purple-800/40 transition-shadow shadow-sm"
    >
      <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center text-lg font-semibold text-white">
        {name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-white font-semibold">{name}</h4>
          <span className="text-xs text-gray-300">{updatedAt ? updatedAt : ''}</span>
        </div>
        <p className="text-sm text-gray-300 mt-1">{snippet || <span className="text-gray-500">No messages yet</span>}</p>
      </div>
    </button>
  );
};

export default ConversationPreviewCard;
