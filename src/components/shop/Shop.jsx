import Navigation from "../layout/Navigation";
import Spinner from "../layout/Spinner";
import UserStats from "../layout/UserStats";
import deck from "../../assets/deck.png";
import card2 from "../../assets/card-2.svg";
import { shopService } from "../../services/shopService";
import CardModal from "./CardModal";
import coins from "../../assets/coins.svg";
import { useEffect, useState } from "react";
import MessageModal from "../layout/MessageModal";
import { CARDS_NUMBER } from "../../lib/constants";
import { useTranslation } from "react-i18next";
import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";

export default function Shop() {
  const { t } = useTranslation();
  const { data: cardsData, refetch: refetchUserData } = useQuery({
    queryKey: ["cardsData"],
    queryFn: async () => (await shopService.getCards()).data,
  });

  const { data: userCards, refetch: refetchUserCards } = useQuery({
    queryKey: ["userCards"],
    queryFn: async () => (await shopService.getUserCards()).data,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [cardId, setCardId] = useState(0);
  const [userCardsIndexes, setUserCardsIndexes] = useState([]);

  useEffect(() => {
    if (userCards) {
      const userCardsIndexes = userCards.map((card) => card.id);
      setUserCardsIndexes(userCardsIndexes);
    }
  }, [userCards]);

  async function handleConfirm() {
    try {
      const response = await shopService.purchaseCard(cardId);
      setIsModalOpen(false);
      setMessage(t("shop.purchaseSuccess"));
      setIsMessageModalOpen(true);
      refetchUserCards();
      refetchUserData();
    } catch (error) {
      let errorMessage = t("shop.purchaseError");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
      setIsMessageModalOpen(true);
    }
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleCardClick(cardId) {
    if (!userCardsIndexes.includes(cardId)) {
      setCardId(cardId);
      setIsModalOpen(true);
    }
  }

  return (
    <Layout>
      {cardsData && userCards ? (
        <>
          <div className="max-w-[350px] mx-auto">
            <h2 className="text-3xl font-bold text-white mb-[30px] tracking-wider">
              {t("shop.title")}
            </h2>
            <div className="border-2 border-[#292139] rounded-md bg-[#D9D9D9] py-[45px] px-[20px]">
              <div className="flex gap-5 mb-[35px]">
                <div className="flex gap-3 items-center text-2xl font-bold mr-[30px] px-5">
                  <p>{t("shop.cards")}</p>
                  <img src={deck} alt="Cards" className="min-w-[20px]" />
                </div>
                <p className="text-sm">{t("shop.bonusHint")}</p>
              </div>
              <div className="w-[150px] h-[5px] bg-[#292139] mx-auto rounded-full blur-[3px] mb-10"></div>
              <p className="text-center mb-5 font-semibold text-xl">
                {t("shop.collected", {
                  current: userCards.length,
                  total: CARDS_NUMBER,
                })}
              </p>
              <ul className="flex flex-wrap justify-between max-w-[280px] mx-auto gap-5 justify-center">
                {cardsData.map((card) => (
                  <li
                    key={card.id}
                    onClick={() => {
                      handleCardClick(card.id);
                    }}
                    className="flex flex-col items-center justify-between border-1 border-[#483D61] w-[130px] h-[175px] rounded-md px-[10px] py-[15px] shadow-lg bg-white"
                  >
                    <img
                      src={card2}
                      alt="Card"
                      className="w-[100%] max-w-[50px]"
                    />
                    <p className="text-center font-medium">{card.name}</p>
                    {userCardsIndexes.includes(card.id) ? (
                      <p className="bg-gray-400 px-3 border-1 rounded-md text-sm text-white border-gray-600 shadow-lg font-bold tracking-wider">
                        {t("shop.owned")}
                      </p>
                    ) : (
                      <div className="flex items-center border justify-center bg-[#FFFAA3] px-3 max-h-[30px] rounded-full mx-auto">
                        {card.price}
                        <img
                          src={coins}
                          alt="Coins"
                          className="w-[100%] max-w-[30px]"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {isModalOpen && (
            <CardModal
              cardId={cardId}
              onConfirm={handleConfirm}
              onClose={handleCancel}
            />
          )}
          {isMessageModalOpen && (
            <MessageModal
              message={message}
              onClose={() => {
                setIsMessageModalOpen(false);
              }}
            />
          )}
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Spinner />
        </div>
      )}
    </Layout>
  );
}
