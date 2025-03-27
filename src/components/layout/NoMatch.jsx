import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NoMatch() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-7">
        <p className="font-bold text-3xl text-white">{t('noMatch.message')}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xl border-2 rounded-lg py-2 cursor-pointer bg-gray-300 hover:bg-gray-400 font-semibold transition duration-300"
        >
          {t('noMatch.goBack')}
        </button>
      </div>
    </div>
  );
}