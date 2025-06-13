import { connectToDB } from "@/config/db";
import Conversation from "@/models/Conversations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json(); 
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectToDB();

    const newConversation = await Conversation.create({
      title,
      messages: [],
    });

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create new conversation" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const conversations = await Conversation.find({}).sort({ createdAt: -1 });

    return NextResponse.json(conversations, { status: 200 }); 
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
