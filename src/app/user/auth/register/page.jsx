"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function RegisterPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) router.push("/user/profile");
  }, [session]);

  // Redirect authenticated users to profile
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const createUser = async () => {
        try {
          setLoading(true);
          await axios.post("/api/user/create", {
            name: session.user.name,
            email: session.user.email,
            imageUrl: session.user.image || "",
          });
          setLoading(false);
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      };
      createUser();
    }
  }, [status, session, router]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

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
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg">
        {/* Left Side - Info Panel (Hidden on Small Screens) */}
        <div className="hidden md:flex md:w-1/3 bg-blue-600 text-white p-6 md:p-8 flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Create an Account
          </h2>
          <p className="text-sm md:text-base text-gray-200">
            Join us and enjoy exclusive benefits, personalized offers, and more!
          </p>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-2/3 p-6 md:p-10">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 text-center mb-6 md:hidden">
            Register
          </h2>

          {/* Name Input */}
          <div className="mb-4 flex items-center border-b border-gray-400 px-3 py-2 focus-within:border-blue-600">
            <FaUser className="text-gray-600 mr-2 md:mr-3 text-sm md:text-lg" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent focus:outline-none text-gray-800 text-sm md:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4 flex items-center border-b border-gray-400 px-3 py-2 focus-within:border-blue-600">
            <FaEnvelope className="text-gray-600 mr-2 md:mr-3 text-sm md:text-lg" />
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
              placeholder="Create Password"
              className="w-full bg-transparent focus:outline-none text-gray-800 text-sm md:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="cursor-pointer bg-green-600 text-white font-semibold text-sm md:text-lg px-6 py-3 w-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 mb-4">
            Register
          </button>

          {/* OR Separator */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-xs md:text-sm text-gray-500 font-semibold">
              OR
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-Up Button */}
          <button
            onClick={() => {
              setLoading(true);
              signIn("google");
            }}
            className="cursor-pointer bg-blue-600 text-white font-semibold text-sm md:text-lg px-6 py-3 w-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-md hover:shadow-lg transform hover:scale-105">
            <FaGoogle className="text-white text-base md:text-xl" /> Sign up
            with Google
          </button>

          {/* Sign-in Option */}
          <p className="mt-4 text-xs md:text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              href="/user/auth/signin"
              className="text-blue-600 cursor-pointer font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
