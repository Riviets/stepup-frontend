import { useTranslation } from "react-i18next";
import close from "../../assets/close.svg";
import { userService } from "../../services/userService";
import { REACT_APP_API_URL } from "../../lib/constants";
import Spinner from "../layout/Spinner";
import { useQuery } from "@tanstack/react-query";

export default function AvatarsModal({ onClose, refetchUserData }) {
  const { t } = useTranslation();
  const { data: avatars, isLoading } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => (await userService.getAvatars()).data,
  });

  function getAvatarUrl(avatar) {
    return `${REACT_APP_API_URL}${avatar?.image_url}`;
  }

  async function setAvatar(avatarId) {
    try {
      const response = await userService.setAvatar(avatarId);
      refetchUserData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen fixed inset-0 z-10"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="w-full max-w-[350px] border-2 border-[#292139] rounded-md shadow-lg bg-[#D9D9D9] relative px-5 py-10">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-2xl font-semibold mb-5 tracking-wider">
              {t("avatarsModal.title")}
            </p>
            <ul className="flex flex-wrap gap-5 justify-center max-h-[240px] overflow-scroll">
              {avatars?.map((avatar) => (
                <li
                  key={avatar.id}
                  onClick={() => {
                    setAvatar(avatar.id);
                  }}
                  className="border-2 rounded-lg"
                >
                  <img
                    src={getAvatarUrl(avatar)}
                    alt={t("avatarsModal.avatarAlt")}
                    className="w-[75px] h-[75px] rounded-md"
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        <button onClick={onClose} className="absolute top-5 right-7">
          <img
            src={close}
            alt={t("avatarsModal.closeAlt")}
            className="min-w-[15px]"
          />
        </button>
      </div>
    </div>
  );
}
