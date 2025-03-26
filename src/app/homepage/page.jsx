"use client";
import { useRouter } from "next/navigation";
import i18next from "@/app/i18n"; // ✅ Import initialized i18next
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t } = useTranslation();

  return (
    <nav>
      <h1>{t("welcome")}</h1>
    </nav>
  );
}
