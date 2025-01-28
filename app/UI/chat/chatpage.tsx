import fetcher from "@/app/fetcher/fetcher";
import { useChat } from "@/app/shared/hooks/useChat";
import { useUserStore } from "@/app/shared/store";
import { ProjectDetails } from "@/app/shared/types";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";

const ChatComponent: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const { user } = useUserStore();
  const { messages, isConnected, sendMessage } = useChat();
  const [lecturerName, setLecturerName] = useState<string>('');

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const { data: project, error: projectError } = useSWR<ProjectDetails>("/projects", fetcher);
        setLecturerName(project?.lecturer.name!);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };

    getProjectDetails();
  }, [user]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Chat with {lecturerName}</h2>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.senderId === user?.id ? 'text-right' : 'text-left'
              }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${msg.senderId === user?.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-r"
            disabled={!isConnected}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
