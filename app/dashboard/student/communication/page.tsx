import ChatComponent from "@/app/UI/chat/chatpage";

const CommunicationPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Communication</h1>
      <div className="flex-grow">
        <ChatComponent />
      </div>
    </div>
  );
};

export default CommunicationPage;
