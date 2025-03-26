
"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const changeLanguage = (lang) => {
    router.push("/", { locale: lang });
  };

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => changeLanguage("en")}>{t("change_language")} (English)</button>
      <button onClick={() => changeLanguage("as")}>{t("change_language")} (Assamese)</button>
    </div>
  );
}
