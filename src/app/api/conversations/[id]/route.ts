import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Conversation from "@/models/Conversations";
import Message from "@/models/Message";
import { generateAiResponse } from "@/utils/get-ai-response";

export async function POST(request: NextRequest,context : { params: { id: string } }) {
  const { content } = await request.json();

  if (!content || !content.message) {
    return new NextResponse("Message content is required", { status: 400 });
  }

  const { message } = content;
  const id  = context.params;

  try {
    await connectToDB();

    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return new NextResponse("Conversation does not exist", { status: 404 });
    }

    const airesponse = await generateAiResponse({ userQuery: message });

    const userMessage = await Message.create({
      role: "user",
      content: message,
    });

    const aiMessage = await Message.create({
      role: "assistant",
      content: airesponse, 
    });

    await Conversation.findByIdAndUpdate(id, {
      $push: { messages: { $each: [userMessage._id, aiMessage._id] } },
    });

    return new NextResponse(JSON.stringify([userMessage, aiMessage]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error saving message", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  context : { params: { id: string } }
) {
  const id = context.params;

  try {
    await connectToDB();

    const conversation = await Conversation.findById(id).populate("messages");

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(conversation.messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error retrieving messages", { status: 500 });
  }
}
