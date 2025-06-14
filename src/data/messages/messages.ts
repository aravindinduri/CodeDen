'server only';
import axios from "axios";
import {Message} from "@/types";
  
  export const getConversationMessages = async (id: string): Promise<Message[]> => {
    const res = await axios.get(`/api/conversations/${id}`);
    return res.data;
  };
  
  export const sendMessageToConversation = async (id: string, message: string): Promise<Message> => {
    const res = await axios.post(`/api/conversations/${id}`, {
      content: { message },
    });
    return res.data;
  };
  