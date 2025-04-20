import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navigationItems } from "../../constants";

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 bg-[#3C2F51] p-[20px] min-w-screen rounded-t-xl z-0">
      <ul className="flex justify-between gap-2 max-w-[500px] mx-auto">
        {navigationItems.map((item) => (
          <li key={item.labelKey} className="nav-item">
            <Link
              className="flex flex-col items-center justify-between gap-2"
              to={item.path}
            >
              <img
                src={item.icon}
                alt={t(item.labelKey)}
                className="w-full max-w-[30px]"
              />
              <span>{t(item.labelKey)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
