'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Message {
  _id: string;
  content: string;
  sender: string;
  createdAt: string;
}

export default function ChatInterface() {
  const params = useParams();
  const id = params?.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${id}`);
        setMessages(res.data);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(`/api/messages/${id}`, {
        content: {
          message : newMessage
          },
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Conversation</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100">
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet.</p>
        )}

        {messages.map((msg) => (
          <div key={msg._id} className="text-sm text-white">
            <div className="font-semibold text-gray-300">{msg.sender}</div>
            <div>{msg.content}</div>
            <div className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-base-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="input input-bordered w-full text-gray-300"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={handleSendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
