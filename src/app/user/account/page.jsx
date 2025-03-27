"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
  FiCheckCircle,
} from "react-icons/fi";
import { FaUserAstronaut } from "react-icons/fa";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!session) {
      router.push("/user/auth/signin");
    }
  }, [session, router]);

  if (loading || !session) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 text-gray-900 flex justify-center px-4 md:px-8 py-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-300 pb-4"
        >
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
              onClick={() => console.log("Change profile picture")}
            >
              <FiEdit className="text-blue-600 cursor-pointer" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">
                {session?.data?.name}
              </h2>
              {session?.data?.verify && (
                <FiCheckCircle className="text-blue-600 text-xl sm:text-2xl" />
              )}
            </div>
            <p className="text-sm text-gray-600">{session?.data?.email}</p>
          </div>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 gap-2">
          <MenuItem icon={<FiBox />} label="orders" href="/user/account/orders" />
          <MenuItem icon={<FiHeart />} label="wishlist" href="/wishlist" />
          <MenuItem icon={<FiSettings />} label="edit_profile" href="/user/account/edit_profile" />
          <MenuItem icon={<FiMapPin />} label="addresses" href="/addresses" />
          <MenuItem icon={<FiCreditCard />} label="payments" href="/payments" />
          <MenuItem icon={<FiTag />} label="coupons" href="/coupons" />
          <MenuItem icon={<FiShield />} label="privacy" href="/privacy" />
          <MenuItem icon={<FiUserCheck />} label="membership" href="/membership" />
          <MenuItem icon={<FiStar />} label="reviews" href="/reviews" />
          <MenuItem icon={<FiShoppingBag />} label="sell" href="/sell" />
          <MenuItem icon={<FiHelpCircle />} label="help" href="/help" />
          <MenuItem icon={<FiLogOut />} label="logout" onClick={() => setLogoutModalOpen(true)} />
        </div>
      </motion.div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          signOut();
          toast.success(t("logoutSuccess"), { position: "top-center", autoClose: 2000 });
          setLogoutModalOpen(false);
          setLoading(true);
        }}
        title={t("confirmation_title")}
        message={t("logout_title")}
      />
    </motion.div>
  );
}

function MenuItem({ icon, label, href, onClick }) {
  const { t } = useTranslation();
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return href ? (
    <motion.div {...motionProps}>
      <Link href={href} className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
        <span className="text-gray-600 text-xl">{icon}</span>
        <span className="text-gray-900 text-sm font-medium capitalize">{t(label)}</span>
      </Link>
    </motion.div>
  ) : (
    <motion.button {...motionProps} onClick={onClick} className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
      <span className="text-gray-600 text-xl">{icon}</span>
      <span className="text-gray-900 text-sm font-medium capitalize">{t(label)}</span>
    </motion.button>
  );
}
