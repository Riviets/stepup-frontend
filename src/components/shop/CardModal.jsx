import { shopService } from "../../services/shopService";
import card2 from "../../assets/card-2.svg";
import coins from "../../assets/coins.svg";
import close from "../../assets/close.svg";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function CardModal({ cardId, onConfirm, onClose }) {
  const { t } = useTranslation();
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCardInfoById() {
      try {
        setIsLoading(true);
        const response = await shopService.getCardInfoById(cardId);
        setCardData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCardInfoById();
  }, [cardId]);

  function getBonusString(type) {
    if (type === "xp_per_habit") return t("cardModal.bonusXpPerHabit");
    if (type === "currency_per_habit")
      return t("cardModal.bonusCurrencyPerHabit");
    if (type === "xp_per_bonus") return t("cardModal.bonusXpPerDay");
    return "";
  }

  if (isLoading) return <div>{t("cardModal.loading")}</div>;
  if (error)
    return <div>{t("cardModal.error", { message: error.message })}</div>;

  return (
    <div
      className="flex items-center justify-center min-h-screen fixed inset-0"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="flex flex-col items-center p-[25px] pt-[60px] pb-[45px] min-w-[250px] min-h-[350px] bg-white rounded-md shadow-lg relative">
        <p className="text-2xl max-w-[270px] text-center mb-[30px] font-bold">
          {t("cardModal.buyPrompt", { cardName: cardData.name })}
        </p>
        <img src={card2} alt="Card" className="min-w-[150px] mb-8" />
        <p className="max-w-[275px] text-center mb-5 font-semibold text-xl">
          + {cardData?.bonus_value} {getBonusString(cardData?.bonus_type)}
        </p>
        <button
          onClick={onConfirm}
          className="flex gap-2 items-center bg-[#FFFAA3] px-8 border-2 border-[#563897] rounded-full shadow-xl"
        >
          <p className="text-xl font-black">{cardData.price}</p>
          <img src={coins} alt="Coins" />
        </button>
        <button onClick={onClose} className="absolute top-[20px] right-[25px]">
          <img src={close} alt="Close" className="min-w-[20px]" />
        </button>
      </div>
    </div>
  );
}
