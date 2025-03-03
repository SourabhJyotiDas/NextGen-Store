"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FiBox,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiMapPin,
  FiCreditCard,
  FiHelpCircle,
} from "react-icons/fi";
import CircularText from "@/lib/CircularText";

export default function Profile() {
  // Sample user data (Replace with actual data from API)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar:
      "https://plus.unsplash.com/premium_photo-1740113056575-83e6661c900e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D", // Replace with actual avatar URL
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      {/* Profile Header */}
      <div className="w-full max-w-3xl bg-gray-100 shadow-lg rounded-lg p-6 mt-10">
        <div className="flex items-center space-x-4 border-b border-gray-300 pb-4">
            {/* Profile Image */}
            <Image
              src={user.avatar}
              alt="Profile Picture"
              width={130}
              height={130}
              className="w-32 h-32 rounded-full border-4 border-green-500 object-cover shadow-md p-1"
            />

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-5 space-y-2">
          <MenuItem icon={<FiBox />} label="My Orders" href="/orders" />
          <MenuItem icon={<FiHeart />} label="Wishlist" href="/wishlist" />
          <MenuItem icon={<FiSettings />} label="Settings" href="/settings" />
          <MenuItem icon={<FiMapPin />} label="Addresses" href="/addresses" />
          <MenuItem
            icon={<FiCreditCard />}
            label="Payment Methods"
            href="/payments"
          />
          <MenuItem
            icon={<FiHelpCircle />}
            label="Help & Support"
            href="/help"
          />
          <MenuItem
            icon={<FiLogOut />}
            label="Logout"
            onClick={() => alert("Logged Out")}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Menu Item Component
function MenuItem({ icon, label, href, onClick }) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer">
        <span className="text-gray-600 text-lg">{icon}</span>
        <span className="text-gray-900 text-md font-medium">{label}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer">
      <span className="text-gray-600 text-lg">{icon}</span>
      <span className="text-gray-900 text-md font-medium">{label}</span>
    </button>
  );
}
