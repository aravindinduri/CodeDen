import React from "react";

const messages = [
  {
    id: 1,
    position: "start",
    name: "Obi-Wan Kenobi",
    time: "12:45",
    text: "You were the Chosen One!",
    avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
    status: "Delivered",
  },
  {
    id: 2,
    position: "end",
    name: "Anakin",
    time: "12:46",
    text: "I hate you!",
    avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
    status: "Seen at 12:46",
  },
];

export default function ChatInterface() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Conversation</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-100">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat chat-${msg.position}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt={msg.name} src={msg.avatar} />
              </div>
            </div>
            <div className="chat-header text-gray-50">
              {msg.name}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">{msg.status}</div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-base-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered w-full text-gray-300"
          />
          <button className="btn btn-primary" >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
