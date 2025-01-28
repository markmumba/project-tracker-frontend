
'use client';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/app/shared/store';
import { useChat } from '@/app/shared/hooks/useChat';

interface ChatComponentProps {
  receiverId: number; // The ID of the user you're chatting with
}

const ChatComponent: React.FC<ChatComponentProps> = ({ receiverId }) => {
  const [inputMessage, setInputMessage] = useState('');
  const { user } = useUserStore();
  const { messages, isConnected, sendMessage } = useChat(receiverId);

  // Ensure user is logged in
  if (!user) {
    return <div>Please log in to chat</div>;
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Chat Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${
              msg.sender_id === user.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender_id === user.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.message}
              <div className="text-xs opacity-50 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-white border-t flex items-center space-x-2">
        <input 
          type="text" 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..." 
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!isConnected || !inputMessage.trim()}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center p-2">
          Disconnected. Attempting to reconnect...
        </div>
      )}
    </div>
  );
};

export default ChatComponent;