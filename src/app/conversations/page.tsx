import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import History from "@/components/features/History/History";
import ChatInterface from "@/components/features/Chat/ChatInterface";
import Preview from "@/components/features/preview/Preview";
export default function ResizableComponent() {
  return (
    <>

    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-[900px] rounded-lg border"
      >
      <ResizablePanel defaultSize={25}>
        <History />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25}>
        <ChatInterface />
      </ResizablePanel>
      <ResizableHandle withHandle />

    <ResizablePanel defaultSize={55}>
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>

    </>
  );
}
