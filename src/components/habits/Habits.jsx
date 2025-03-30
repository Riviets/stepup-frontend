import Navigation from "../layout/Navigation";
import UserStats from "../layout/UserStats";
import useFetch from "../hooks/useFetch";
import Spinner from "../layout/Spinner";
import xp from '../../assets/xp.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from '../../assets/arrow-bottom.png';
import { habitsService } from "../../services/habitsService";
import { trackerService } from '../../services/trackerService';
import MessageModal from "../layout/MessageModal";
import ConfirmModal from "../layout/ConfirmModal";
import { useTranslation } from "react-i18next";

export default function Habits() {
  const { t } = useTranslation();
  const [defaultHabitsVisible, setDefaultHabitsVisible] = useState(false);
  const [userHabitsVisible, setUserHabitsVisible] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(0);
  const navigate = useNavigate();

  const { data: defaultHabits, refetch: refetchDefaultHabits } = useFetch(habitsService.getDefaultHabits);
  const { data: userHabits, refetch: refetchUserHabits } = useFetch(habitsService.getUserHabits);

  async function addHabitToTracker(habitId) {
    try {
      setLoading(true);
      setIsMessageModalOpen(true);
      const response = await trackerService.addHabitToTracker(habitId);
      setMessage(t('habits.habitAddedToTracker'));
      refetchUserHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || t('habits.serverError'));
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
      setMessage(error.response?.data?.message || t('habits.serverError'));
      setIsMessageModalOpen(true);
    }
  }

  function handleAddHabit() {
    navigate('/habits/add');
  }

  return (
    <div>
      {defaultHabits && userHabits && !loading ? (
        <div className="py-10 pb-[170px] min-h-screen">
          <UserStats />
          <div className="max-w-[350px] mx-auto border-3 border-[#483D61] rounded-md bg-[#D9D9D9] mb-10">
            <div onClick={() => { setDefaultHabitsVisible(!defaultHabitsVisible); }} className="flex justify-between items-center px-[25px] py-[10px] text-xl font-bold">
              <p>{t('habits.default')}</p>
              <img 
                src={arrow} 
                alt="Show/Hide" 
                className={`transition-transform duration-300 ${defaultHabitsVisible ? 'rotate-180' : ''}`} 
              />
            </div>
            {defaultHabitsVisible &&
              <ul className="flex flex-col gap-7 px-[25px] pb-[30px] pt-5 border-t-3">
                {defaultHabits.map((habit) => (
                  <li key={habit.id} className="flex items-start gap-6">
                    <div className="habit-btn">
                      <button onClick={() => { addHabitToTracker(habit.id); }} className="font-bold text-xl">+</button>
                    </div>
                    <div className="flex justify-between flex-1 gap-2 mr-auto">
                      <p className="text-lg font-medium">{habit.name}</p>
                      <div className="flex gap-2 items-center max-w-[130px] justify-between">
                        <div className="stats">+{habit.xp}
                          <img className="min-w-[30px]" src={xp} alt="xp" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>}
          </div>
          <div className="max-w-[350px] mx-auto border-3 border-[#483D61] rounded-md bg-[#D9D9D9]">
            <div onClick={() => { setUserHabitsVisible(!userHabitsVisible); }} className="flex justify-between items-center px-[25px] py-[10px] text-xl font-bold">
              <p>{t('habits.custom')}</p>
              <img 
                src={arrow} 
                alt="Show/Hide" 
                className={`transition-transform duration-300 ${userHabitsVisible ? 'rotate-180' : ''}`} 
              />
            </div>
            {userHabitsVisible &&
              <div className="flex flex-col gap-7 px-[25px] pb-[30px] pt-5 border-t-3">
                <button onClick={handleAddHabit} className="bg-white px-5 border-2 border-[#483D61] rounded-md text-lg font-semibold max-w-fit">{t('habits.addSomeMore')}</button>
                {userHabits.length === 0 ? <p className="text-xl font-semibold text-center">{t('habits.empty')}</p> :
                  userHabits.map((habit) => (
                    <li key={habit.id} className="flex items-start gap-6">
                      <div className="habit-btn">
                        <button onClick={() => { addHabitToTracker(habit.id); }} className="font-bold text-xl">+</button>
                      </div>
                      <div className="flex flex-col gap-2 mr-auto">
                        <p className="text-lg font-medium">{habit.name}</p>
                        <div className="flex gap-2 items-center max-w-[130px] justify-between">
                          <div className="stats">+{habit.xp}
                            <img className="min-w-[30px]" src={xp} alt="xp" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div onClick={() => { setSelectedHabitId(habit.id); navigate(`/habits/edit/${habit.id}`); }} className="habit-btn">
                          <button>✎</button>
                        </div>
                        <div onClick={() => { setSelectedHabitId(habit.id); setIsConfirmModalOpen(true); }} className="habit-btn">
                          <button>🗑</button>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </div>
            }
          </div>
          <Navigation />
          {isMessageModalOpen && <MessageModal message={message} onClose={() => { setIsMessageModalOpen(false); }} />}
          {isConfirmModalOpen && <ConfirmModal message={t('habits.permanentlyDelete')} onClose={() => { setIsConfirmModalOpen(false); }} onConfirm={handleDelete} />}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Spinner />
        </div>
      )}
    </div>
  );
}