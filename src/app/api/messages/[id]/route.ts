import { connectToDB } from "@/config/db";
import { NextRequest,NextResponse } from "next/server";
import Conversation from "@/models/Conversations";
import Message from "@/models/Message";
export async function POST(request:NextRequest) {
    const {content} = await request.json();
    if(!content){
        return new NextResponse("id and message is required",{status:401});
    }
    const {id , message} = content;
    try{

        await connectToDB();
        const conservation = await Conversation.findById(id);
        if(!conservation){
            return new NextResponse("Conservation does not exist",{status:401});
        }
        const newMessage = await Message.create({
            role : "user",
            content : message
        })
        await Conversation.findByIdAndUpdate(id, {
            $push: { messages: newMessage._id },
        });
        
        return new Response(JSON.stringify(newMessage), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
     catch (err) {
      console.error(err);
      return new Response('Error saving message', { status: 500 });
    }
}


export async function GET(){
    
}