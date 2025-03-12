"use client";

import React, { useEffect } from "react";
import {
  FaShippingFast,
  FaMoneyBillWave,
  FaUndo,
  FaWallet,
} from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (session) {
      router.replace("/user/profile"); // Redirect without adding history
    }
  }, [session, router]); // Added router to dependencies for clarity

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="w-full max-w-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to NextGen Store</h1>
        <div className="flex flex-col gap-4">
          <Link
            href="/user/auth/register"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 text-center hover:bg-blue-700">
            Create Account
          </Link>
          <Link
            href="/user/auth/signin"
            className="w-full cursor-pointer border border-gray-400 py-2 text-center hover:bg-gray-200">
            Sign In
          </Link>
        </div>
      </div>

      {/* Promo Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-5xl">
        <PromoCard
          icon={<FaMoneyBillWave className="text-green-500 text-4xl" />}
          title="Cashback on First Order"
          description="Get 10% cashback on your first order."
        />
        <PromoCard
          icon={<FaShippingFast className="text-blue-500 text-4xl" />}
          title="Free Delivery"
          description="Enjoy free delivery on your first order."
        />
        <PromoCard
          icon={<FaUndo className="text-red-500 text-4xl" />}
          title="Easy Returns"
          description="Hassle-free 7-day return policy."
        />
        <PromoCard
          icon={<FaWallet className="text-purple-500 text-4xl" />}
          title="Pay on Delivery"
          description="Cash on delivery available for all orders."
        />
      </div>
    </div>
  );
}

// Promo Card Component
function PromoCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
      {icon}
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  );
}
