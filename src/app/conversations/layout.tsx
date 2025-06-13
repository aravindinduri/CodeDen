import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import History from '@/components/features/History/History';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-[900px] rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <History />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={75}>
        <div className="p-4 h-full overflow-auto">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
