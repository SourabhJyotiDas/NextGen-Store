"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import FileUpload from "@/components/fileUpload";

export default function EditProfile() {
  const { data: session, update } = useSession();
  const { t } = useTranslation();

  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState(session?.user?.phone || "");
  const [gender, setGender] = useState(session?.user?.gender || "");
  const [avatar, setAvatar] = useState(session?.user?.image || "");
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isVerificationOpen, setVerificationOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

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

  const saveChanges = () => {
    toast.success("Profile updated successfully!");
  };


  const [showChooseFile,setShowChooseFile] = useState(false);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={avatar}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full shadow-md"
            />
            <button
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
              onClick={() => setShowChooseFile(true)}>
              <FiCamera className="text-blue-600" />
            </button>
          </div>

          {
            showChooseFile && <FileUpload/>
          }

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
