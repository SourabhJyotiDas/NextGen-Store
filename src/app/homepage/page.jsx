"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log("session---->",session)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        {session ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Welcome, {session.user?.name}</h2>
            <img 
              src={session.user?.image || ""} 
              alt="User Avatar" 
              className="w-20 h-20 rounded-full mx-auto mb-4 border border-gray-300 shadow-md"
            />
            <button 
              onClick={() => signOut()} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={() => signIn("google")} 
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 w-full"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
