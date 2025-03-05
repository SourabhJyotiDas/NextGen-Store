"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading"; // Import your Loading Component

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Redirect if session exists
  useEffect(() => {
    if (status === "loading") {
      setLoading(true); // Ensure loading state is maintained
    } else if (status === "authenticated") {
      router.push("/user/profile");
    } else {
      setLoading(false); // Only stop loading if unauthenticated
    }
  }, [status, router]);

  // Show loading screen while session status is unknown
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <button 
          onClick={() => {signIn("google"), setLoading(true)}} 
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
