import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatInterface from "@/components/features/Chat/ChatInterface";
export default function ResizableComponent() {
  return (
    <>
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-[900px] rounded-lg border"
      >      
      <ResizablePanel defaultSize={50}>
        <ChatInterface />
      </ResizablePanel>
     </ResizablePanelGroup> 
    </>
  );
}
