import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import puzzle from '../../assets/puzzle.svg'
import puzzleSet from "../../assets/puzzle-set.svg";
import close from "../../assets/close.svg";
import { levelsService } from "../../services/levelsService";

export default function PuzzlesModal({ onClose }) {
  const { data: puzzleSetsData } = useFetch(levelsService.getUserSets);

  useEffect(() => {
    if (puzzleSetsData) {
      console.log(puzzleSetsData);
    }
  }, [puzzleSetsData]);

  const renderSquares = (collected) => {
    const totalSquares = 4;
    const squares = [];

    for (let i = 0; i < totalSquares; i++) {
      squares.push(
        <div
          key={i}
          className={`w-[35px] h-[35px] rounded-sm
            ${ i < collected ? "bg-green-400" : "bg-gray-300"}
            border-2`}> 
            <img src={puzzle} alt="Puzzle" className="" />
            </div>
      );
    }

    return squares;
  };

  return (
    <div
      className="flex items-center justify-center fixed inset-0"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-[#D9D9D9] px-[25px] pt-[30px] pb-[50px] border-2 border-[#292139] rounded-lg relative w-[100%] max-w-[370px]">
        <p className="text-center text-3xl font-bold mb-[35px]">Puzzles</p>
        <ul className="flex flex-col gap-4 max-h-[470px] overflow-scroll p-2 border border-[#292139] rounded-md">
          {puzzleSetsData?.map((set) => (
            <li
              key={set.set_id}
              className="bg-white p-[20px] border-2 border-[#292139] rounded-md shadow-xl"
            >
              <div className="flex gap-6 mb-[30px]">
                <img
                  src={puzzleSet}
                  alt="Set"
                  className="w-[100%] max-w-[50px]"
                />
                <div className="flex flex-col">
                  <p className="text-xl font-bold mb-2">Puzzle {set.set_name}</p>
                  <div className="flex gap-2">
                    {renderSquares(set.collected)}
                  </div>
                </div>
              </div>
              <p className="tracking-wider text-lg">+{set.bonus_value}% to the earned xp</p>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="absolute top-5 right-5">
          <img src={close} alt="Close" className="min-w-[25px]" />
        </button>
      </div>
    </div>
  );
}