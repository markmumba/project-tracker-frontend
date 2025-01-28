import axios from 'axios';
import { MessageDetails } from '../types';

class CommunicationService {
  private baseUrl = 'http://localhost:8080/communications';

  // Fetch messages between two users
  async getMessagesBetweenUsers(senderId: number, receiverId: number): Promise<MessageDetails[]> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          sender_id: senderId,
          receiver_id: receiverId
        },
        withCredentials: true // Important for sending cookies
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // Optional: Method to manually save a message via REST (fallback)
  async saveMessage(message: Omit<MessageDetails, 'id' | 'timestamp'>): Promise<MessageDetails> {
    try {
      const response = await axios.post(this.baseUrl, message, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
}

export default new CommunicationService();