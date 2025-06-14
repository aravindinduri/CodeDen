'use client';

export default function ResizableComponent() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-base-200">
      <div className="bg-base-100 border border-base-300 rounded-md shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Select a Conversation
        </h2>
        <p className="text-gray-400">
          Choose a conversation from the sidebar to view or continue your chat.
        </p>
      </div>
    </div>
  );
}
