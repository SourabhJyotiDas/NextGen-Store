"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { FaGoogle, FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.replace("/user/profile"); // Redirect without adding history
    }
  }, [session, router]); // Added router to dependencies for clarity


  // Redirect authenticated users to profile
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const createUser = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post("/api/user/create", {
            name: session.user.name,
            email: session.user.email,
            imageUrl: session.user.image || "",
          });
          // toast.success(data.message);
          setLoading(false);
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      };
      createUser();
    }
  }, [status, session, router]);

  // Handle email/password sign-in
  const handleSignIn = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/user/profile");
    }
  };

  if (loading || status === "loading") return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Info Panel (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-1/3 bg-blue-600 text-white p-6 md:p-8 flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Sign In</h2>
          <p className="text-sm md:text-base text-gray-200">
            Get access to your Orders, Wishlist, and Recommendations.
          </p>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full md:w-2/3 p-6 md:p-10">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 text-center mb-6 md:hidden">
            Sign In
          </h2>

          {/* Email Input */}
          <div className="mb-4 flex items-center border-b border-gray-400 px-3 py-2 focus-within:border-blue-600">
            <FaUser className="text-gray-600 mr-2 md:mr-3 text-sm md:text-lg" />
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full bg-transparent focus:outline-none text-gray-800 text-sm md:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-5 flex items-center border-b border-gray-400 px-3 py-2 focus-within:border-blue-600">
            <FaLock className="text-gray-600 mr-2 md:mr-3 text-sm md:text-lg" />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full bg-transparent focus:outline-none text-gray-800 text-sm md:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            className="bg-green-600 text-white font-semibold text-sm md:text-lg px-6 py-3 w-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 mb-4">
            Sign In
          </button>

          {/* OR Separator */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-xs md:text-sm text-gray-500 font-semibold">
              OR
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={() => {
              setLoading(true);
              signIn("google");
            }}
            className="bg-blue-600 text-white font-semibold text-sm md:text-lg px-6 py-3 w-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-md hover:shadow-lg transform hover:scale-105">
            <FaGoogle className="text-white text-base md:text-xl" /> Sign in
            with Google
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-xs md:text-sm text-gray-600 text-center">
            New to the site?{" "}
            <Link
              href="/user/auth/register"
              className="text-blue-600 cursor-pointer font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
