"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading"; // Import your Loading Component
import { toast } from "react-toastify";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createUser = async () => {
      if (status === "authenticated" && session?.user) {
        setLoading(true);
        try {
          const { name, email, image } = session.user;
          const { data } = await axios.post(
            "http://localhost:3000/api/user/create",
            {
              name,
              email,
              imageUrl: image,
            }
          );

          toast.success(data?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          router.push("/user/profile");
        } catch (error) {
          console.error("Error creating user:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    createUser();
  }, [status, session, router]);

  if (loading || status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <button
          onClick={() => {
            signIn("google");
            setLoading(true);
          }}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 w-full">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
