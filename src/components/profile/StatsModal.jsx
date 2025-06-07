import { authService } from "../../services/authService";
import close from "../../assets/close.svg";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

export default function StatsModal({ onClose }) {
  const { t } = useTranslation();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => (await authService.getCurrentUser()).data,
  });

  return (
    <div
      className="flex items-center justify-center fixed inset-0"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-[#D9D9D9] px-8 py-10 rounded-md border-2 border-[#292139] w-full max-w-[350px] relative">
        <p className="text-2xl font-black text-center mb-8">
          {t("statsModal.title")}
        </p>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-3 justify-between font-bold text-lg items-center">
            <p>{t("statsModal.bonusCurrencyPerHabit")}</p>
            <p className="px-2 border-2 rounded-lg bg-yellow-100">
              {userData?.bonus_currency_per_habit}
            </p>
          </li>
          <li className="flex gap-3 justify-between font-bold text-lg items-center">
            <p>{t("statsModal.bonusXpPerDay")}</p>
            <p className="px-2 border-2 rounded-lg bg-yellow-100">
              {userData?.bonus_xp_per_day}
            </p>
          </li>
          <li className="flex gap-3 justify-between font-bold text-lg items-center">
            <p>{t("statsModal.bonusXpPerHabit")}</p>
            <p className="px-2 border-2 rounded-lg bg-yellow-100">
              {userData?.bonus_xp_per_habit}
            </p>
          </li>
        </ul>
        <button onClick={onClose} className="absolute top-5 right-7">
          <img src={close} alt="Close Stats Modal" className="min-w-[15px]" />
        </button>
      </div>
    </div>
  );
}
