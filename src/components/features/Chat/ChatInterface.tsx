'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Message {
  _id: string;
  role: 'user' | 'ai';
  content: string;
  reactComponent?: string;
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
        const res = await axios.get(`/api/conversations/${id}`);
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
      const res = await axios.post(`/api/conversations/${id}`, {
        content: { message: newMessage },
      });

      const aiResponse: Message = res.data;

      const userMessage: Message = {
        _id: `${Date.now()}`,
        role: 'user',
        content: newMessage,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage, aiResponse]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-base-200">
        <h1 className="text-xl font-semibold text-white">Conversation</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100">
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet.</p>
        )}

        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg._id}
              className={`p-3 border rounded-md text-sm ${
                isUser ? 'bg-gray-700 text-white' : 'bg-gray-800 text-green-300'
              }`}
            >
              <div className="font-semibold text-gray-400 mb-1">
                {isUser ? 'You' : 'AI Assistant'}
              </div>

              <div className="whitespace-pre-wrap text-white mb-2">
                {msg.content}
              </div>

              {msg.reactComponent && (
                <div className="rounded bg-black p-3 overflow-x-auto text-green-300 text-sm mb-2">
                  <pre>
                    <code>{msg.reactComponent}</code>
                  </pre>
                </div>
              )}

              <div className="text-xs text-gray-500 mt-2">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t p-4 bg-base-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="input input-bordered w-full text-white"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
