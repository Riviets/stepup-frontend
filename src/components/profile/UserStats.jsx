import puzzle from '../../assets/puzzle.png'
import puzzleSet from '../../assets/puzzle-set.png'
import card from '../../assets/card.png'
import { CARDS_NUMBER, PUZZLES_NUMBER, PUZZLE_SETS_NUMBER } from "../../lib/constants"

export default function UserStats({userCards, userPuzzles, completedSets, handleOpenPuzzlesModal}){
    return(
        <div className="py-[15px] px-[30px] bg-[#D9D9D9] bg-opacity-85 rounded-lg border-3 border-[#292139] mb-[25px]">
            <ul onClick={handleOpenPuzzlesModal} className="flex justify-between items-center">
                <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                        <img src={card} alt="Cards" />
                    </div>
                    <p>{userCards.length}/{CARDS_NUMBER}</p>
                </li>
                <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                        <img src={puzzle} alt="Puzzles" />
                    </div>
                    <p>{userPuzzles.length}/{PUZZLES_NUMBER}</p>
                </li>
                <li className="flex flex-col items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center justify-center w-[50px] h-[50px] border-2 rounded-md border-[#1A1C25] ">
                        <img src={puzzleSet} alt="Puzzle sets" />
                    </div>
                    <p>{completedSets}/{PUZZLE_SETS_NUMBER}</p>
                </li>
            </ul>
        </div>
    )
}