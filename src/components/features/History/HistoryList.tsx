"use client"
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from 'next/navigation';

import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Link from "next/link";

type Conversation = {
  _id: string;
  title: string;
  messages: any[];
};

export function HistoryList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const currpath = usePathname();
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/api/conversations");
        console.log(response.data)
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <ScrollArea className="h-full w-auto rounded-md border">
      <div className="p-4">
        {conversations.map((conv) => (
          <Link href={`${currpath}/${conv._id}`} key={conv._id} >
            <div className="text-sm text-gray-50 font-medium">{conv.title}</div>
            <Separator className="my-2" />
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
