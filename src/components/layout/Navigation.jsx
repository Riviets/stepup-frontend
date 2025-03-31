import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import habits from "../../assets/navigation/habits.png";
import tracker from "../../assets/navigation/tracker.png";
import shop from "../../assets/navigation/shop.png";
import levels from "../../assets/navigation/levels.png";
import profile from "../../assets/navigation/profile.png";

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 bg-[#3C2F51] p-[20px] min-w-screen rounded-t-xl z-0">
      <ul className="flex justify-between gap-2 max-w-[500px] mx-auto">
        <li className="nav-item">
          <Link className="flex flex-col items-center justify-between gap-2" to="/habits">
            <img src={habits} alt={t("navigation.habits")} className="w-full max-w-[30px]" />
            <span>{t("navigation.habits")}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="flex flex-col items-center justify-between gap-2" to="/tracker">
            <img src={tracker} alt={t("navigation.tracker")} className="w-full max-w-[30px]" />
            <span>{t("navigation.tracker")}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="flex flex-col items-center justify-between gap-2" to="/shop">
            <img src={shop} alt={t("navigation.shop")} className="w-full max-w-[30px]" />
            <span>{t("navigation.shop")}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="flex flex-col items-center justify-between gap-2" to="/levels">
            <img src={levels} alt={t("navigation.levels")} className="w-full max-w-[30px]" />
            <span>{t("navigation.levels")}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="flex flex-col items-center justify-between gap-2" to="/profile">
            <img src={profile} alt={t("navigation.profile")} className="w-full max-w-[30px]" />
            <span>{t("navigation.profile")}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
