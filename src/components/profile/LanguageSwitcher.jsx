import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="flex gap-1">
        <button
          onClick={() => changeLanguage("ua")}
          className={`btn ${
            i18n.language === "ua" ? "bg-purple-900" : "bg-gray-600"
          }`}
        >
          UA
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={`btn ${
            i18n.language === "en" ? "bg-purple-900" : "bg-gray-600"
          }`}
        >
          EN
        </button>
      </div>
    </>
  );
}
