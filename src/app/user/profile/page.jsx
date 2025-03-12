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
import { FiCheckCircle } from "react-icons/fi"; // Import verification icon
import axios from "axios";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const sendEmail = async (userEmail) => {
    try {
      const {
        data: { verificationCode },
      } = await axios.post(
        "/api/user/sentVerificationCode",
        { email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = await axios.post(
        "/api/sendEmail",
        {
          to: userEmail,
          subject: "NextGen Store Verification",
          text: `your verification code is ${verificationCode}.Do not share with anyone.`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateClick = () => {
    setShowVerificationInput(true);
    sendEmail(session?.data?.email); // Send code when user clicks "Update"
  };

  const verifyCode = async () => {
    try {
      const { data } = await axios.post(
        "/api/user/verification",
        { email: session?.data?.email, verificationCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error("Invalid Code. Try Again.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/user/auth/signin");
    }
  }, [session, router]);

  if (loading || !session) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center px-4 md:px-8 py-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 sm:p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-300 pb-4">
          <div className="relative">
            {session?.data?.avatar?.url ? (
              <Image
                src={session?.data?.avatar?.url}
                alt="Profile Picture"
                width={100}
                height={100}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-600 object-cover shadow-md p-1"
              />
            ) : (
              <FaUserAstronaut className="w-24 h-24 sm:w-28 sm:h-28 text-6xl sm:text-7xl rounded-full border-4 border-blue-600 object-cover shadow-md p-1" />
            )}
            <button
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-200 transition"
              onClick={() => console.log("Change profile picture")}>
              <FiEdit className="text-blue-600 cursor-pointer" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">
                {session?.data?.name}
              </h2>
              {/* Show verification badge if user is verified */}
              {session?.data?.verify && (
                <FiCheckCircle className="text-blue-600 text-xl sm:text-2xl" />
              )}
            </div>
            {/* Email appears below the username */}
            <p className="text-sm text-gray-600">{session?.data?.email}</p>
          </div>
        </div>

        {/* Email Verification Section */}
        {session?.data?.verify === false && (
          <div className="mt-4 p-3 bg-white shadow-md rounded-lg flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiMail className="text-blue-500 text-xl sm:text-2xl" />
              <div>
                <h3 className="text-sm sm:text-md font-medium">
                  Verify your Email
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {showVerificationInput
                    ? "Enter the code sent to your email"
                    : "Get the latest updates"}
                </p>
              </div>
            </div>

            {/* Toggle Input & Buttons When "Update" is Clicked */}
            {showVerificationInput ? (
              <div className="mt-3 sm:mt-0 flex space-x-2">
                <input
                  maxLength={6}
                  minLength={6}
                  type="text"
                  placeholder="Enter Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="border-2 border-blue-600 px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 text-center"
                />
                <button
                  onClick={verifyCode}
                  className="px-6 py-2 bg-green-600 text-white text-xs sm:text-sm cursor-pointer hover:bg-green-700 transition">
                  Verify
                </button>
                <button
                  onClick={() => sendEmail(session?.data?.email)}
                  className="px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm cursor-pointer hover:bg-blue-700 transition">
                  Send Again
                </button>
              </div>
            ) : (
              <button
                onClick={handleUpdateClick}
                className="px-6 py-2 bg-blue-600 text-white text-xs sm:text-sm cursor-pointer hover:bg-blue-700 transition mt-3 sm:mt-0">
                Verify
              </button>
            )}
          </div>
        )}

        {/* Menu Section */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 gap-2">
          <MenuItem icon={<FiBox />} label="Orders" href="/orders" />
          <MenuItem icon={<FiHeart />} label="Wishlist" href="/wishlist" />
          <MenuItem
            icon={<FiSettings />}
            label="Edit Profile"
            href="/user/settings"
          />
          <MenuItem icon={<FiMapPin />} label="Addresses" href="/addresses" />
          <MenuItem icon={<FiCreditCard />} label="Payments" href="/payments" />
          <MenuItem icon={<FiTag />} label="Coupons" href="/coupons" />
          <MenuItem icon={<FiShield />} label="Privacy" href="/privacy" />
          <MenuItem
            icon={<FiUserCheck />}
            label="Membership"
            href="/membership"
          />
          <MenuItem icon={<FiStar />} label="Reviews" href="/reviews" />
          <MenuItem icon={<FiShoppingBag />} label="Sell" href="/sell" />
          <MenuItem icon={<FiHelpCircle />} label="Help" href="/help" />
          <MenuItem
            icon={<FiLogOut />}
            label="Logout"
            onClick={() => setLogoutModalOpen(true)}
          />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          signOut();
          toast.success("Logout successful!", {
            position: "top-center",
            autoClose: 2000,
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

/* Reusable Menu Item Component */
function MenuItem({ icon, label, href, onClick }) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex flex-col items-center sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-center sm:text-left">
        <span className="text-gray-600 text-xl">{icon}</span>
        <span className="text-gray-900 text-sm sm:text-md font-medium">
          {label}
        </span>
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-center sm:text-left">
      <span className="text-gray-600 text-xl">{icon}</span>
      <span className="text-gray-900 text-sm sm:text-md font-medium">
        {label}
      </span>
    </button>
  );
}
