import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import History from '@/components/features/History/History';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-base-100 text-white">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full border border-base-300 rounded-lg"
      >
        <ResizablePanel
          defaultSize={25}
          minSize={15}
          maxSize={40}
          className="bg-base-200 border-r border-base-300"
        >
          <div className="h-full overflow-y-auto p-4">
            <History />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-base-300" />

        <ResizablePanel defaultSize={75} className="bg-base-100">
          <div className="h-full overflow-auto">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
