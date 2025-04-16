"use client";

import { useEffect, useState } from "react"; // make sure useEffect is imported
import { motion } from "framer-motion";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import FileUpload from "@/components/fileUpload";
import { headers } from "../../../../../next.config";

export default function EditProfile() {
  const { data: session, update } = useSession();

  console.log(session);

  const { t } = useTranslation();

  const [userId, setUserId] = useState(session?.data?._id || "");

  console.log(userId);

  const [name, setName] = useState(session?.data?.name || "");
  const [email, setEmail] = useState(session?.data?.email || "");
  const [phone, setPhone] = useState(session?.data?.phone || "");
  const [gender, setGender] = useState(session?.data?.gender || "");
  const [avatar, setAvatar] = useState(
    session?.data?.image ?? session?.user?.image
  );
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isVerificationOpen, setVerificationOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [uploadedImageUrl, setUploadedImageUrl] = useState({});

  const [isEdit, setIsEdit] = useState(false);
  const [progress, setProgress] = useState(0);

  const openEmailModal = () => setEmailModalOpen(true);

  const handleEmailSubmit = async () => {
    if (!newEmail) {
      toast.error("Please enter a new email!");
      return;
    }
    try {
      setEmailModalOpen(false);
      setVerificationOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending code");
    }
  };

  const verifyCode = async () => {
    try {
      setEmail(newEmail);
      setVerificationOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveChanges = async () => {
    try {
      if (progress !== 100 && uploadedImageUrl) {
        toast.info("Profile picture is still uploading. Please wait...");
        return; // Prevent saving while upload is incomplete
      }
  
      const updatePromise = axios.post(
        `/api/user/update?userId=${userId}`,
        {
          name,
          phone,
          gender,
          imageUrl: uploadedImageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.promise(updatePromise, {
        pending: "Saving profile...",
        success: "Profile updated successfully!",
        error: "Failed to update profile.",
      });
  
      const { data } = await updatePromise;
  
      if (data.success) {
        console.log("Updated user:", data.user);
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  
  useEffect(() => {
    if (session?.data) {
      setUserId(session.data._id || "");
      setName(session.data.name || "");
      setEmail(session.data.email || "");
      setPhone(session.data.phone || "");
      setGender(session.data.gender || "");
      setAvatar(session?.data?.image ?? session?.user?.image);
    }
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div
            className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center"
            style={{
              background:
                progress > 0 && progress < 100
                  ? `conic-gradient(#3b82f6 ${progress * 3.6}deg, #e5e7eb ${
                      progress * 3.6
                    }deg)`
                  : "#e5e7eb",
              transition: "background 0.3s ease-in-out",
            }}>
            {avatar && !isEdit && (
              <Image
                src={`${avatar}?tr=w-300,h-300,fo-auto`}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-md"
              />
            )}
            {isEdit && (
              <Image
                src={`${avatar}?tr=w-300,h-300,fo-auto`}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-md"
              />
            )}

            <button
              className="absolute bottom-1 right-1 px-2 py-1 bg-white border border-blue-500 rounded-full shadow"
              onClick={() => {
                setIsEdit(true);
              }}>
              <FileUpload
                setUploadedImageUrl={setUploadedImageUrl}
                setAvatar={setAvatar}
                setProgress={setProgress}
              />
            </button>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-4 px-4 py-2 border w-full"
            placeholder={t("name")}
          />
          <div className="mt-4 flex items-center w-full">
            <input
              type="text"
              value={email}
              className="px-4 py-2 border flex-grow bg-gray-100 cursor-not-allowed"
              disabled
            />
            <span
              onClick={openEmailModal}
              className="ml-2 text-blue-600 cursor-pointer font-bold">
              {t("update")}
            </span>
          </div>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-4 px-4 py-2 border w-full"
            placeholder={t("phone")}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-4 px-4 py-2 border w-full bg-white">
            <option value="">{t("select_gender")}</option>
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>
          <button
            onClick={saveChanges}
            className="mt-6 w-full bg-blue-600 text-white py-2 font-semibold shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer">
            {t("save")}
          </button>
        </div>
      </div>

      {/* Email Input Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold">{t("Enter New Email")}</h2>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mt-4 px-4 py-2 border w-full"
              placeholder={t("Enter new email")}
            />
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setEmailModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 transition">
                {t("cancel")}
              </button>
              <button
                onClick={handleEmailSubmit}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                {t("submit")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Code UI */}
      {isVerificationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold">{t("verify_email")}</h2>
            <p className="text-gray-600 my-4">{t("enter_verification_code")}</p>
            <div className="flex justify-center space-x-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => {
                    let newCode = [...verificationCode];
                    newCode[index] = e.target.value;
                    setVerificationCode(newCode);
                  }}
                  className="w-10 h-10 border text-center text-xl"
                />
              ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setVerificationOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 transition">
                {t("cancel")}
              </button>
              <button
                onClick={verifyCode}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
