import useFetch from "../hooks/useFetch";
import puzzle from '../../assets/puzzle.svg';
import puzzleSet from "../../assets/puzzle-set.svg";
import close from "../../assets/close.svg";
import { levelsService } from "../../services/levelsService";
import { PUZZLES_IN_SET } from "../../lib/constants";
import { useTranslation } from "react-i18next";
import Spinner from "../layout/Spinner"; 

export default function PuzzlesModal({ onClose }) {
  const { t } = useTranslation();
  const { data: puzzleSetsData } = useFetch(levelsService.getUserSets);

  const renderSquares = (collected) => {
    const totalSquares = PUZZLES_IN_SET;
    const squares = [];

    for (let i = 0; i < totalSquares; i++) {
      squares.push(
        <div
          key={i}
          className={`w-[45px] h-[45px] rounded-sm ${i < collected ? "bg-green-400" : "bg-gray-300"} border-2`}
        >
          <img src={puzzle} alt="Puzzle" className="" />
        </div>
      );
    }

    return squares;
  };

  return (
    <div className="flex items-center justify-center fixed inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      {puzzleSetsData ? (
        <div className="bg-[#D9D9D9] px-[25px] pt-[30px] pb-[50px] border-2 border-[#292139] rounded-lg relative w-[100%] max-w-[370px]">
          <p className="text-center text-3xl font-bold mb-[35px]">{t('puzzlesModal.title')}</p>
          <ul className="flex flex-col gap-4 max-h-[470px] overflow-scroll px-2 py-3 border border-[#292139] rounded-md bg-yellow-100">
            {puzzleSetsData.map((set) => (
              <li
                key={set.set_id}
                className="flex flex-col gap-4 bg-white p-[20px] border-2 border-[#292139] rounded-md shadow-xl"
              >
                <div className="flex gap-6 mb-[10px]">
                  <img src={puzzleSet} alt="Set" className="w-[100%] max-w-[50px]" />
                  <div className="flex flex-col">
                    <p className="text-xl font-bold">{t('puzzlesModal.puzzle')} {set.set_name}</p>
                    <p>{set.collected}/{PUZZLES_IN_SET}</p>
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  {renderSquares(set.collected)}
                </div>
                <p className="tracking-wider text-lg">{t('puzzlesModal.bonus', { value: set.bonus_value })}</p>
              </li>
            ))}
          </ul>
          <button onClick={onClose} className="absolute top-5 right-5">
            <img src={close} alt="Close" className="min-w-[25px]" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Spinner />
        </div>
      )}
    </div>
  );
}