import { useTranslation } from "react-i18next";
import arrow from '../../assets/arrow-bottom.png';
import xp from '../../assets/xp.png';
import { useNavigate } from "react-router-dom";

export default function UserHabitsList({habits, isVisible, setIsVisible, handleAddHabit, setSelectedHabitId, setIsConfirmModalOpen, addHabitToTracker}){

    const { t } = useTranslation()
    const navigate = useNavigate()

    return(
        <div className="max-w-[350px] mx-auto border-3 border-[#483D61] rounded-md bg-[#D9D9D9] mb-10">
    <div onClick={() => { setIsVisible(!isVisible); }} className="flex justify-between items-center px-[25px] py-[10px] text-xl font-bold">
      <p>{t('habits.custom')}</p>
      <img 
        src={arrow} 
        alt="Show/Hide" 
        className={`transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`} 
      />
    </div>
    {isVisible &&
      <div className="flex flex-col gap-7 px-[25px] pb-[30px] pt-5 border-t-3">
        <button onClick={handleAddHabit} className="bg-white px-5 border-2 border-[#483D61] rounded-md text-lg font-semibold max-w-fit">{t('habits.addSomeMore')}</button>
        {habits.length === 0 ? <p className="text-xl font-semibold text-center">{t('habits.empty')}</p> :
          habits.map((habit) => (
            <li key={habit.id} className="flex items-start gap-6">
              <div className="habit-btn">
                <button onClick={() => { addHabitToTracker(habit.id); }} className="font-bold text-xl size-5 flex items-center justify-center">+</button>
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
    )
}