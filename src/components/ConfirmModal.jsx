"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {

  const { t } = useTranslation();

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 my-4">{message}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition cursor-pointer"
          >
           {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
             {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
