import { useEffect, useState, useRef } from "react";
import analythics from "../../assets/analythics.svg";
import { useQuery } from "@tanstack/react-query";
import xp from "../../assets/xp.svg";
import tick from "../../assets/tick.svg";
import { trackerService } from "../../services/trackerService";
import MessageModal from "../layout/MessageModal";
import Analytics from "./Analythics";
import { useTranslation } from "react-i18next";
import Spinner from "../layout/Spinner";
import Layout from "../layout/Layout";
import Button from "../buttons/Button";

export default function Tracker() {
  const { t } = useTranslation();
  const date = new Date();
  const [formatedDate, setFormatedDate] = useState("");
  const { data: habitsInTracker, refetch: refetchHabitsInTracker } = useQuery({
    queryKey: ["habitsInTracker"],
    queryFn: async () => (await trackerService.getHabitsInTracker()).data,
  });

  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isAnalythicsVisible, setIsAnalythicsVisible] = useState(false);
  const [dailyCompletionsIds, setDailyCompletionsIds] = useState([]);
  const [bonusIsCollecting, setBonusIsCollecting] = useState(false);
  const refetchUserData = useRef(null);

  function formatDate(num) {
    if (num < 10) return `0${num}`;
    return num;
  }

  function formFormatedDateString() {
    return `${formatDate(date.getFullYear())}-${formatDate(
      date.getMonth() + 1
    )}-${formatDate(date.getDate())}`;
  }

  async function getDailyCompletions() {
    try {
      const formatedDate = formFormatedDateString();
      const response = await trackerService.getDailyCompletions(formatedDate);
      const completions = response.data;
      const completionsIds = completions.map((habit) => habit.id);
      setDailyCompletionsIds(completionsIds);
    } catch (error) {
      setMessage(error.response?.data?.message || t("tracker.serverError"));
      setIsMessageModalOpen(true);
    }
  }

  useEffect(() => {
    getDailyCompletions();
  }, []);

  useEffect(() => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setFormatedDate(
      `${formatDate(day)}-${formatDate(month)}-${formatDate(year)}`
    );
  }, [date]);

  async function handleCollectBonus() {
    try {
      setBonusIsCollecting(true);
      const formatedDate = formFormatedDateString();
      const response = await trackerService.claimBonus(formatedDate);
      setMessage(t("tracker.bonusReceived"));
      setIsMessageModalOpen(true);
      if (refetchUserData.current) refetchUserData.current();
    } catch (error) {
      setMessage(error.response?.data?.message || t("tracker.serverError"));
      setIsMessageModalOpen(true);
      setBonusIsCollecting(false);
    } finally {
      setBonusIsCollecting(false);
    }
  }

  async function handleRemove(habitId) {
    try {
      await trackerService.removeHabitFromTracker(habitId);
      setMessage(t("tracker.habitRemoved"));
      setIsMessageModalOpen(true);
      refetchHabitsInTracker();
    } catch (error) {
      setMessage(error.response?.data?.message || t("tracker.serverError"));
      setIsMessageModalOpen(true);
    }
  }

  async function handleComplete(habitId) {
    const formatedDate = formFormatedDateString();
    try {
      const response = await trackerService.completeHabit(
        habitId,
        formatedDate
      );
      setMessage(t("tracker.habitCompleted"));
      setIsMessageModalOpen(true);
      refetchHabitsInTracker();
      getDailyCompletions();
      if (refetchUserData.current) refetchUserData.current();
    } catch (error) {
      setMessage(error.response?.data?.message || t("tracker.serverError"));
      setIsMessageModalOpen(true);
    }
  }

  return (
    <Layout refetch={refetchUserData}>
      {habitsInTracker ? (
        <>
          <div className="max-w-[370px] bg-[#D9D9D9] mx-auto border-2 border-[#483D61] rounded-lg">
            <div className="py-3 border-b-2">
              <p className="text-center">{formatedDate}</p>
            </div>
            <div className="py-[35px] px-[20px]">
              <div className="flex justify-between items-center mb-[30px] mx-auto max-w-[270px]">
                <p className="text-2xl font-black">
                  {t("tracker.dailyTracker")}
                </p>
                <button
                  onClick={() => {
                    setIsAnalythicsVisible(true);
                  }}
                  className="flex items-center gap-1 bg-yellow-100 px-2 py-1 border-1 rounded-full max-h-[25px] -mr-3"
                >
                  <img src={analythics} alt="Graph" className="min-w-[10px]" />
                  <p className="text-sm">{t("tracker.analytics")}</p>
                </button>
              </div>
              <div className="max-h-[290px] overflow-scroll px-2">
                {habitsInTracker.length > 0 ? (
                  <ul className="flex flex-col gap-5">
                    {habitsInTracker.map((habit) => (
                      <li
                        key={habit.id}
                        className={`flex items-center border border-[#563897] rounded-lg pl-[15px] pr-[25px] py-3
                          ${
                            dailyCompletionsIds.includes(habit.id)
                              ? "bg-gray-400"
                              : "bg-white"
                          }`}
                      >
                        <div className="stats mr-[15px]">
                          <p className="text-sm">+{habit.xp}</p>
                          <img
                            src={xp}
                            alt="XP"
                            className="max-w-[20px] -mb-[2px]"
                          />
                        </div>
                        <p className="text-lg mr-auto">{habit.name}</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleRemove(habit.id)}
                            className="flex items-center justify-center font-black bg-yellow-100 w-[25px] h-[25px] border border-[#563897] rounded-sm"
                          >
                            <p className="-mb-[2px] text-2xl font-black">−</p>
                          </button>
                          <button
                            onClick={() => handleComplete(habit.id)}
                            className="flex items-center justify-center font-black bg-yellow-100 w-[25px] h-[25px] border border-[#563897] rounded-sm"
                          >
                            <img
                              src={tick}
                              alt="Done"
                              className="min-w-[20px]"
                            />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-lg font-medium py-10">
                    {t("tracker.empty")}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <Button
                  onClick={handleCollectBonus}
                  className="border-1 border-[#483D61] px-[30px] rounded-md bg-[#FFCE68] text-white tracking-wider font-bold [text-shadow:0px_1px_3px_black] mt-5 text-lg"
                  isSubmitting={bonusIsCollecting}
                >
                  {t("tracker.collectBonus")}
                </Button>
              </div>
            </div>
          </div>
          {isMessageModalOpen && (
            <MessageModal
              message={message}
              onClose={() => setIsMessageModalOpen(false)}
            />
          )}
          {isAnalythicsVisible && (
            <Analytics
              onClose={() => {
                setIsAnalythicsVisible(false);
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
