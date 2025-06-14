'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/conversations');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Welcome to ChatAI!
      </h1>
      <button
        onClick={handleGetStarted}
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Get Started →
      </button>
    </div>
  );
}
