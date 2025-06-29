import Spinner from "../layout/Spinner";
import { useState } from "react";
import { habitsService } from "../../services/habitsService";
import { trackerService } from "../../services/trackerService";
import MessageModal from "../layout/MessageModal";
import ConfirmModal from "../layout/ConfirmModal";
import { useTranslation } from "react-i18next";
import arrow from "../../assets/arrow-bottom.png";
import DefaultHabitsList from "./DefaultHabitsList";
import UserHabitsList from "./UserHabitsList";
import xp from "../../assets/xp.svg";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";

export default function Habits() {
  const { t } = useTranslation();
  const [defaultHabitsVisible, setDefaultHabitsVisible] = useState(false);
  const [userHabitsVisible, setUserHabitsVisible] = useState(false);
  const [suggestedHabitsVisible, setSuggestedHabitsVisible] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(0);

  const { data: defaultHabits } = useQuery({
    queryKey: ["defaultHabits"],
    queryFn: async () => (await habitsService.getDefaultHabits()).data,
  });

  const { data: userHabits, refetch: refetchUserHabits } = useQuery({
    queryKey: ["userHabits"],
    queryFn: async () => (await habitsService.getUserHabits()).data,
  });

  const { data: suggestedHabits, refetch: refetchSuggestedHabits } = useQuery({
    queryKey: ["suggestedHabits"],
    queryFn: async () => (await habitsService.getSuggestedHabits()).data,
  });

  const navigate = useNavigate();

  async function addHabitToTracker(habitId) {
    try {
      setLoading(true);
      setIsMessageModalOpen(true);
      const response = await trackerService.addHabitToTracker(habitId);
      setMessage(t("habits.habitAddedToTracker"));
      refetchUserHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || t("habits.serverError"));
      setIsMessageModalOpen(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const response = await habitsService.deleteUserHabit(selectedHabitId);
      setIsConfirmModalOpen(false);
      refetchUserHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || t("habits.serverError"));
      setIsMessageModalOpen(true);
      console.log(error.response.data.message);
    }
  }

  async function handleAcceptSuggestedHabit(habitId, isAccepted) {
    try {
      const response = await habitsService.respondToSuggestedHabit(
        habitId,
        isAccepted
      );
      console.log(response.data);
      refetchSuggestedHabits();
      refetchUserHabits();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  function handleAddHabit() {
    navigate("/habits/add");
  }

  return (
    <Layout>
      {defaultHabits && userHabits && !loading ? (
        <div className="py-10 pb-[170px] min-h-screen">
          <DefaultHabitsList
            habits={defaultHabits}
            isVisible={defaultHabitsVisible}
            setIsVisible={setDefaultHabitsVisible}
          />
          <UserHabitsList
            habits={userHabits}
            isVisible={userHabitsVisible}
            setIsVisible={setUserHabitsVisible}
            handleAddHabit={handleAddHabit}
            setSelectedHabitId={setSelectedHabitId}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            addHabitToTracker={addHabitToTracker}
          />
          <div className="max-w-[350px] mx-auto border-3 border-[#483D61] rounded-md bg-[#D9D9D9] mb-10">
            <div
              onClick={() => {
                setSuggestedHabitsVisible(!suggestedHabitsVisible);
              }}
              className="flex justify-between items-center px-[25px] py-[10px] text-xl font-bold"
            >
              <div className="flex gap-2 items-center">
                <p>{t("habits.suggested")}</p>
                {suggestedHabits?.length === 0 ? (
                  <></>
                ) : (
                  <p className="flex items-center justify-center text-sm text-white bg-[#563897] rounded-full w-6 h-6">
                    {suggestedHabits?.length}
                  </p>
                )}
              </div>
              <img
                src={arrow}
                alt="Show/Hide"
                className={`transition-transform duration-300 ${
                  suggestedHabitsVisible ? "rotate-180" : ""
                }`}
              />
            </div>
            {suggestedHabitsVisible && (
              <ul className="flex flex-col gap-7 px-[25px] pb-[30px] pt-5 border-t-3">
                {suggestedHabits?.length === 0 ? (
                  <p className="text-lg">{t("habits.empty")}</p>
                ) : (
                  <>
                    {suggestedHabits?.map((habit) => (
                      <li key={habit.id} className="flex items-start gap-6">
                        <div className="habit-btn">
                          <button
                            onClick={() => {
                              addHabitToTracker(habit.id);
                            }}
                            className="font-bold text-xl"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex justify-between flex-1 gap-2 mr-auto flex-wrap">
                          <div className="flex flex-col">
                            <p className="text-lg font-medium">{habit.name}</p>
                            <p>(Від {habit?.suggested_by_username})</p>
                          </div>
                          <div className="flex gap-2 items-center max-w-[130px] justify-between">
                            <div className="stats">
                              +{habit.xp}
                              <img className="min-w-[30px]" src={xp} alt="xp" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              handleAcceptSuggestedHabit(habit.id, true);
                            }}
                            className="flex items-center justify-center border-[#292139] w-[25px] h-[25px] border-2 rounded-sm bg-green-500 text-white font-bold text-lg"
                          >
                            +
                          </button>
                          <button
                            onClick={() => {
                              handleAcceptSuggestedHabit(habit.id, false);
                            }}
                            className="flex items-center justify-center border-[#292139] w-[25px] h-[25px] border-2 rounded-sm bg-red-400 text-white font-bold text-lg"
                          >
                            -
                          </button>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>
          {isMessageModalOpen && (
            <MessageModal
              message={message}
              onClose={() => {
                setIsMessageModalOpen(false);
              }}
            />
          )}
          {isConfirmModalOpen && (
            <ConfirmModal
              message={t("habits.permanentlyDelete")}
              onClose={() => {
                setIsConfirmModalOpen(false);
              }}
              onConfirm={handleDelete}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Spinner />
        </div>
      )}
    </Layout>
  );
}
