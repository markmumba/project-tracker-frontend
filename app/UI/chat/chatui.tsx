'use client';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/app/shared/store';
import { useChat } from '@/app/shared/hooks/useChat';
import { useSearchParams } from 'next/navigation';

// Define interfaces for our types
interface Message {
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string;
}

interface ChatUIProps {
  messages: Message[];
  isConnected: boolean;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  userId: number;
}

// Type-safe component
const ChatUI: React.FC<ChatUIProps> = ({ 
  messages, 
  isConnected, 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  userId 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg: Message, index: number) => (
          <div
            key={index}
            className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender_id === userId
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

      <div className="p-4 bg-white border-t flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || !inputMessage.trim()}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          type="button"
        >
          Send
        </button>
      </div>

      {!isConnected && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center p-2">
          Disconnected. Attempting to reconnect...
        </div>
      )}
    </div>
  );
};

export default ChatUI;