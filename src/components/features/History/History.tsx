'use client';

import React from 'react';
import { HistoryList } from '@/components/features/History/HistoryList';

export default function History() {
  return (
    <div className="h-full bg-base-200 border-r border-base-300 flex flex-col">
      <div className="p-4 border-b border-base-300">
        <h2 className="text-xl font-semibold text-white">Past Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <HistoryList />
      </div>
    </div>
  );
}
