"use client";
import { useRouter } from "next/navigation"; 
import i18next from "@/app/i18n"; // ✅ Import initialized i18next
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation();

  const changeLanguage = async (lang) => {
    await i18next.changeLanguage(lang); // ✅ Works now!
    router.refresh(); // ✅ Refresh to apply changes
  };

  return (
    <nav>
      <h1>{t("welcome")}</h1>
      <button 
        className="cursor-pointer px-10 py-3 bg-blue-500 mx-5" 
        onClick={() => changeLanguage("en")}
      >
        🇬🇧 English
      </button>
      <button 
        className="cursor-pointer px-10 py-3 bg-green-500 mx-5" 
        onClick={() => changeLanguage("as")}
      >
        🇮🇳 Assamese
      </button>
    </nav>
  );
}
