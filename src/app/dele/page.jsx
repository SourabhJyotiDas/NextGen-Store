"use client";
import { useRouter } from "next/navigation"; 
import { useTranslation } from "next-i18next";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation("common"); // Load 'common.json'
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language in i18next
    router.push(`/${lang}`); // Update URL
  };
  
  return (
    <nav>
      <h1>{t("welcome")}</h1>
      <button className="cursor-pointer px-10 py-3 bg-blue-500 mx-5 " onClick={() => changeLanguage("en")}>🇬🇧 English</button>
      <button className="cursor-pointer px-10 py-3 bg-green-500 mx-5 " onClick={() => changeLanguage("as")}>🇮🇳 Assamese</button>
    </nav>
  );
}
