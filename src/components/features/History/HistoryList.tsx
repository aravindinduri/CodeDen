import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
const tags = Array.from({ length: 3 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
export function HistoryList() {
  return (
    <ScrollArea className="h-full w-auto rounded-md border">
      <div className="p-4">
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">Conversation</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}