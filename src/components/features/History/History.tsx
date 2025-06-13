"use client"
import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { HistoryList } from './HistoryList';

export default function History() {

  const addNewConversation = async () => {
    try {
      const response = await axios.post("/api/conversations", {
        title : "New Conversation",
      });
      console.log("Conversation created:", response.data);
    } catch (error) {
      console.error("Failed to create new conversation:", error);
    }
  };
  
  return (
    <div  className='h-full bg-accent-foreground'>
      <ul className="list bg-base-100 shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide text-gray-50">Past Conversations</li>
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide text-gray-50 cursor-pointer border-1 justify-center flex flex-col ">
          <button onClick={addNewConversation} className=' border-2 p-2 cursor-pointer shadow-base-100 bg-gray-200 text-gray-900 ' >New Conversation</button>
        </li>

        <li className="list-row cursor-pointer">
          <div className="list-col-grow">
          <HistoryList/>
          </div>
        </li>
      </ul>

    </div>
  )
}
