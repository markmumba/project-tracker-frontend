import { useChat } from "@/app/shared/hooks/useChat";
import { useUserStore } from "@/app/shared/store";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ChatUI from "./chatui";

interface User {
  id: number;
  name: string;
  // Add other user properties as needed
}

const ChatPage: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const { user } = useUserStore() as { user: User | null };
  const searchParams = useSearchParams();
  const receiverId = parseInt(searchParams.get('receiverId') || '0', 10);

  // Error states with proper types
  if (!receiverId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl text-red-600 mb-2">Invalid Chat</h2>
          <p>No receiver specified. Please select a user to chat with.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl text-yellow-600 mb-2">Authentication Required</h2>
          <p>Please log in to access the chat.</p>
        </div>
      </div>
    );
  }

  const { messages, isConnected, sendMessage } = useChat(receiverId);

  const handleSendMessage = (): void => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <ChatUI
      messages={messages}
      isConnected={isConnected}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      handleSendMessage={handleSendMessage}
      userId={user.id}
    />
  );
};

export default ChatPage;