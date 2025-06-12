
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import History from "@/components/features/History/History"
export default function ResizableComponent() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className=" w-full h-full rounded-lg border"
    >
     <History/>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
