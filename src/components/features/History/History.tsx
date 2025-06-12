import React from 'react'
import { HistoryList } from './HistoryList';
import { ResizablePanel } from '../../ui/resizable';
export default function History() {
  return (
    <div>
         <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <h1 >Convesations</h1>
        </div>
        <HistoryList/>
      </ResizablePanel>
      
    </div>
  )
}
