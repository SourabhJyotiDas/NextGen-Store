"use client";
import { useEffect, useState } from "react";
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
import { useSession, signOut } from "next-auth/react";
import ConfirmModal from "@/components/ConfirmModal"; // Import modal
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";


export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to /profile if session exists
  useEffect(() => {
    if (!session) {
      router.push("/user/auth/signin");
    }
  }, [session, router]);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show loading screen while session status is unknown
  if (loading || !session) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      {/* Profile Header */}
      <div className="w-full max-w-3xl bg-gray-100 shadow-lg rounded-lg p-6 mt-10">
        <div className="flex items-center space-x-4 border-b border-gray-300 pb-4">
          {/* Profile Image */}
          <Image
            src={session?.user?.image || "/default-avatar.png"}
            alt="Profile Picture"
            width={130}
            height={130}
            className="w-32 h-32 rounded-full border-4 border-green-500 object-cover shadow-md p-1"
          />
          <div>
            <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
            <p className="text-sm text-gray-600">{session?.user?.email}</p>
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
          <MenuItem icon={<FiHelpCircle />} label="Help & Support" href="/help" />
          <MenuItem
            icon={<FiLogOut />}
            label="Logout"
            onClick={() => setLogoutModalOpen(true)} // Open modal on logout click
          />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          signOut();
          toast.success('Logout successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          setLogoutModalOpen(false);
          setLoading(true)
        }}
        title="Are you sure?"
        message="Do you really want to log out?"
      />
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
