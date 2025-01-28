import { useState, useEffect, useRef, useCallback } from "react";
import { useUserStore } from "../store";

// Define the message interface to match your backend model
export interface MessageDetails {
  id?: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string;
}

export const useChat = (receiverId?: number) => {
  const [messages, setMessages] = useState<MessageDetails[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useUserStore();
  const ws = useRef<WebSocket | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const connectWebSocket = useCallback(() => {
    // Close existing connection if it exists
    if (ws.current) {
      ws.current.close();
    }

    // Ensure we have a user and receiver
    if (!user || !receiverId) return;

    // Create new WebSocket connection
    ws.current = new WebSocket(`ws://localhost:8080/ws`);

    ws.current.onopen = () => {
      setIsConnected(true);
      setReconnectAttempts(0);
      
      // Fetch previous messages when connection is established
      fetchPreviousMessages();
    };

    ws.current.onmessage = (event) => {
      try {
        const message: MessageDetails = JSON.parse(event.data);
        setMessages((prevMessages) => {
          // Prevent duplicate messages
          const isDuplicate = prevMessages.some(
            m => m.message === message.message && 
                 m.timestamp === message.timestamp
          );
          return isDuplicate ? prevMessages : [...prevMessages, message];
        });
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      
      // Implement exponential backoff for reconnection
      if (reconnectAttempts < 5) {
        const timeout = Math.pow(2, reconnectAttempts) * 1000;
        setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
          connectWebSocket();
        }, timeout);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setIsConnected(false);
    };
  }, [reconnectAttempts, user, receiverId]);

  // Fetch previous messages between users
  const fetchPreviousMessages = useCallback(async () => {
    if (!user || !receiverId) return;

    try {
      const response = await fetch(
        `http://localhost:8080/communications`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const previousMessages: MessageDetails[] = await response.json();
      setMessages(previousMessages);
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  }, [user, receiverId]);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim() || !isConnected || !ws.current || !user || !receiverId) return;

    const chatMessage: MessageDetails = {
      sender_id:user.id!,
      receiver_id: receiverId,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    ws.current.send(JSON.stringify(chatMessage));
  }, [isConnected, user, receiverId]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

  return { 
    messages, 
    isConnected, 
    sendMessage,
    reconnectAttempts
  };
};