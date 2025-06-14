'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Bot, User } from 'lucide-react';
import { getConversationMessages, sendMessageToConversation } from '@/data/messages/messages';
import Preview from '../preview/Preview';
import { Message } from '@/types';

export default function ChatInterface() {
  const params = useParams();
  const id = params?.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [reactComponentCode, setReactComponentCode] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        const data = await getConversationMessages(id);
        setMessages(data);

        const latestAIMessage = data
          .slice()
          .reverse()
          .find((msg) => msg.role === 'ai');

        if (latestAIMessage?.reactComponent) {
          setReactComponentCode(latestAIMessage.reactComponent);
        } else {
          setReactComponentCode(null);
        }

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
      const aiResponse = await sendMessageToConversation(id, newMessage);

      const userMessage: Message = {
        _id: `${Date.now()}`,
        role: 'user',
        content: newMessage,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage, aiResponse]);

      if (aiResponse.reactComponent) {
        setReactComponentCode(aiResponse.reactComponent);
      } else {
        setReactComponentCode(null);
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-full h-full bg-zinc-900 text-white">
      <div className={`flex flex-col ${reactComponentCode ? 'w-1/2' : 'w-full'} h-full`}>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-zinc-900">
          {messages.length === 0 && (
            <p className="text-gray-400">No messages yet.</p>
          )}

          {messages.map((msg) => (
            <div key={msg._id} className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                {msg.role === 'user' ? (
                  <User className="text-blue-400 w-5 h-5" />
                ) : (
                  <Bot className="text-green-400 w-5 h-5" />
                )}
              </div>

              <div className="flex-1 bg-zinc-800 p-4 rounded-md">
                <div className="font-semibold text-sm text-gray-400 mb-1">
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </div>

                <div className="whitespace-pre-wrap mb-2 text-gray-100">{msg.content}</div>

                {msg.reactComponent && (
                  <div className="bg-black p-3 rounded overflow-x-auto text-green-300 text-sm font-mono mb-2">
                    <pre>
                      <code>{msg.reactComponent}</code>
                    </pre>
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 p-4 bg-zinc-950">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              className="input input-bordered w-full bg-zinc-800 text-white border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-primary px-4 py-2 text-sm font-semibold"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      {reactComponentCode && (
        <div className="w-1/2 h-full border-l border-zinc-800 bg-zinc-950">
          <Preview code={reactComponentCode} />
        </div>
      )}
    </div>
  );
}
