"use client";
import { useRouter } from "next/navigation"; 
import i18next from "@/app/i18n"; 

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = async (lang) => {
    await i18next.changeLanguage(lang); // ✅ Works now!
    router.refresh(); 
  };

  return (
    <nav>
     {/* Language Switcher */}
     <div className="flex space-x-3">
          <button
            className="text-sm px-3 py-1 bg-blue-500 rounded-md"
            onClick={() => changeLanguage("en")}
          >
            🇬🇧 English
          </button>
          <button
            className="text-sm px-3 py-1 bg-green-500 rounded-md"
            onClick={() => changeLanguage("as")}
          >
            🇮🇳 Assamese
          </button>
          <button  className="text-sm px-3 py-1 bg-green-500 rounded-md" onClick={() => changeLanguage("hi")}>🇮🇳 हिंदी</button>
        </div>
    </nav>
  );
}
