"use client";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t } = useTranslation();

  return (
    <nav>
      <h1>{t("welcome")}</h1>
    </nav>
  );
}
