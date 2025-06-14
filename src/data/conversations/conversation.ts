'server only';
import axios from 'axios';

export const createConversation = async (title: string = 'New Conversation') => {
  const response = await axios.post('/api/conversations', { title });
  return response.data;
};

export const updateConversationTitle = async (id: string, title: string) => {
  const response = await axios.patch(`/api/conversations/${id}`, { title });
  return response.data;
};

export const fetchAllConversations = async () => {
  const response = await axios.get('/api/conversations');
  return response.data;
};

export const deleteConversation = async (id: string) => {
  const response = await axios.delete(`/api/conversations/${id}`);
  return response.data;
};
