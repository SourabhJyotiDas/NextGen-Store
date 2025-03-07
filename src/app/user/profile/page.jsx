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
  FiEdit,
  FiMail,
  FiTag,
  FiShield,
  FiStar,
  FiShoppingBag,
  FiUserCheck,
} from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { FaUserAstronaut } from "react-icons/fa";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/user/auth/signin");
    }
  }, [session, router]);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading || !session) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-gray-100 shadow-lg rounded-lg p-6 mt-10">
        <div className="flex items-center space-x-4 border-b border-gray-300 pb-4">
          <div className="relative">
            {session?.data?.avatar?.url ? (
              <Image
                src={session?.data?.avatar?.url}
                alt="Profile Picture"
                width={130}
                height={130}
                className="w-32 h-32 rounded-full border-4 border-green-500 object-cover shadow-md p-1"
              />
            ) : (
              <FaUserAstronaut className="w-32 h-32 text-8xl rounded-full border-4 border-green-500 object-cover shadow-md p-1" />
            )}
            <button
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-200 transition"
              onClick={() => console.log("Change profile picture")}
            >
              <FiEdit className="text-blue-600 cursor-pointer " />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{session?.data?.name}</h2>
            <p className="text-sm text-gray-600">{session?.data?.email}</p>
          </div>
        </div>

        {session?.data?.verify === false && (
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiMail className="text-blue-500 text-2xl" />
              <div>
                <h3 className="text-md font-medium">Add/Verify your Email</h3>
                <p className="text-sm text-gray-600">Get latest updates of your orders</p>
              </div>
            </div>
            <button
              onClick={() => console.log("Update Email")}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        )}

        <div className="mt-5 space-y-2">
          <MenuItem icon={<FiBox />} label="My Orders" href="/orders" />
          <MenuItem icon={<FiHeart />} label="Wishlist" href="/wishlist" />
          <MenuItem icon={<FiSettings />} label="Edit Profile" href="/user/settings" />
          <MenuItem icon={<FiMapPin />} label="Addresses" href="/addresses" />
          <MenuItem icon={<FiCreditCard />} label="Payment Methods" href="/payments" />
          <MenuItem icon={<FiTag />} label="Coupons" href="/coupons" />
          <MenuItem icon={<FiShield />} label="Privacy" href="/privacy" />
          <MenuItem icon={<FiUserCheck />} label="Membership" href="/membership" />
          <MenuItem icon={<FiStar />} label="Reviews" href="/reviews" />
          <MenuItem icon={<FiShoppingBag />} label="Sell on Store" href="/sell" />
          <MenuItem icon={<FiHelpCircle />} label="Help & Support" href="/help" />
          <MenuItem icon={<FiLogOut />} label="Logout" onClick={() => setLogoutModalOpen(true)} />
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          signOut();
          toast.success("Logout successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLogoutModalOpen(false);
          setLoading(true);
        }}
        title="Are you sure?"
        message="Do you really want to log out?"
      />
    </div>
  );
}

function MenuItem({ icon, label, href, onClick }) {
  if (href) {
    return (
      <Link href={href} className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer">
        <span className="text-gray-600 text-lg">{icon}</span>
        <span className="text-gray-900 text-md font-medium">{label}</span>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer">
      <span className="text-gray-600 text-lg">{icon}</span>
      <span className="text-gray-900 text-md font-medium">{label}</span>
    </button>
  );
}
