'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from 'react-icons/fi';
import {
  createConversation,
  fetchAllConversations,
  updateConversationTitle,
  deleteConversation,
} from '@/data/conversations/conversation';
import {Conversation} from '@/types';
export function HistoryList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const data = await fetchAllConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (id: string, title: string) => {
    setEditingId(id);
    setNewTitle(title);
  };

  const handleSave = async () => {
    if (editingId && newTitle.trim()) {
      try {
        await updateConversationTitle(editingId, newTitle.trim());
        await loadConversations();
      } catch (err) {
        console.error('Failed to update title:', err);
      }
    }
    setEditingId(null);
    setNewTitle('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewTitle('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteConversation(id);
      await loadConversations();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleAddConversation = async () => {
    try {
     const res = await createConversation();
     router.push(`/conversations/${res._id}`)
      await loadConversations();
    } catch (err) {
      console.error('Failed to add conversation:', err);
    }
  };

  const handleSelectConversation = (id: string) => {
    if (editingId !== id) {
      router.push(`/conversations/${id}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddConversation}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        <FiPlus />
        New Conversation
      </button>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {conversations.map((conv) => (
            <li
              key={conv._id}
              className="p-3 bg-base-100 rounded-md flex justify-between items-center hover:bg-base-300 transition cursor-pointer group"
              onClick={() => handleSelectConversation(conv._id)}
            >
              {editingId === conv._id ? (
                <>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="bg-zinc-800 text-white p-2 rounded w-full mr-2 outline-none"
                  />
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave();
                      }}
                      className="text-green-400 hover:text-green-500"
                      title="Save"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel();
                      }}
                      className="text-red-400 hover:text-red-500"
                      title="Cancel"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-white truncate flex-1">{conv.title}</span>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(conv._id, conv.title);
                      }}
                      className="text-blue-400 hover:text-blue-500"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(conv._id);
                      }}
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
