import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Conversation from "@/models/Conversations";
import Message from "@/models/Message";
import { generateAiResponse } from "@/utils/get-ai-response";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const message = body?.content?.message;
  if (!message) {
    return new NextResponse("Message content is required", { status: 400 });
  }

  const { id } = await params;

  try {
    await connectToDB();

    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return new NextResponse("Conversation does not exist", { status: 404 });
    }

    const airesponse = await generateAiResponse({ userQuery: message });

    if ("error" in airesponse) {
      return new NextResponse(JSON.stringify({ error: airesponse.error }), {
        status: 500,
      });
    }

    const { content, reactComponent } = airesponse;

    const userMessage = await Message.create({
      role: "user",
      content: message,
      belongsTo: conversation._id,
    });

    const aiMessage = await Message.create({
      role: "ai",
      content,
      reactComponent,
      belongsTo: conversation._id,
    });

    await Conversation.findByIdAndUpdate(conversation._id, {
      $push: { messages: { $each: [userMessage._id, aiMessage._id] } },
    });

    return new NextResponse(JSON.stringify(aiMessage), {
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDB();

    const conversation = await Conversation.findById(id).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } },
    });

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


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { title } = body;

  if (!title) {
    return new NextResponse("Title is required", { status: 400 });
  }

  try {
    await connectToDB();

    const updated = await Conversation.findByIdAndUpdate(
      id,
      { title },
    );

    if (!updated) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Failed to update title", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDB();

    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    await Message.deleteMany({ belongsTo: conversation._id });

    await Conversation.findByIdAndDelete(conversation._id);

    return new NextResponse(null, { status: 204 }); 
  } catch (err) {
    console.error("DELETE error:", err);
    return new NextResponse("Failed to delete conversation", { status: 500 });
  }
}