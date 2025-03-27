"use client";

import { useRouter } from "next/navigation";
import i18next from "@/app/i18n"; // Import i18next
import { motion } from "framer-motion"; // For animations

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "sd", name: "سنڌي (Sindhi)" },
  { code: "ne", name: "नेपाली (Nepali)" },
  { code: "ks", name: "کٲشُر (Kashmiri)" },
];

export default function SelectLanguage() {
  const router = useRouter();

  const changeLanguage = async (lang) => {
    await i18next.changeLanguage(lang); // Change language dynamically
    router.refresh(); // Refresh page after language change
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg rounded-2xl p-6 max-w-lg w-full text-center border border-gray-300"
      >
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          🌐 Select Your Language
        </h2>
        <p className="text-gray-600 mb-4 text-lg">Choose a language to continue</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-md px-4 py-2 bg-white text-gray-900 rounded-lg shadow-md border border-gray-300 
                         hover:bg-gray-300 hover:text-gray-900 transition font-medium cursor-pointer"
            >
              {lang.name}
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 text-gray-700 hover:underline text-lg font-medium"
        >
          ← Go Back
        </button>
      </motion.div>
    </div>
  );
}
