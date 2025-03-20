import { Link } from "react-router-dom";
import habits from '../../assets/navigation/habits.png'
import tracker from '../../assets/navigation/tracker.png'
import shop from '../../assets/navigation/shop.png'
import levels from '../../assets/navigation/levels.png'
import profile from '../../assets/navigation/profile.png'


export default function Navigation(){
    return(
        <nav className="fixed bottom-0 bg-[#3C2F51] p-[20px] min-w-screen rounded-t-xl">
            <ul className="flex justify-between gap-2 max-w-[500px] mx-auto">
            <li className='nav-item'>
                <Link className='flex flex-col gap-1 items-center gap-2' to='/habits'>
                    <img src={habits} alt="" />
                    Habits
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='flex flex-col gap-1 items-center gap-2' to='/tracker'>
                    <img src={tracker} alt="" />
                    Tracker
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='flex flex-col gap-1 items-center gap-2' to='/shop'>
                    <img src={shop} alt="" />
                    Shop
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='flex flex-col gap-1 items-center gap-2' to='/levels'>
                    <img src={levels} alt="" />
                    Levels
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='flex flex-col gap-1 items-center gap-2' to='/profile'>
                    <img src={profile} alt="" />
                    Profile
                </Link>
            </li>
        </ul>
        </nav>
    )
}