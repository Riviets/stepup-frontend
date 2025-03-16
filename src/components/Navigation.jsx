import { Link } from "react-router-dom";

export default function Navigation(){
    return(
        <ul>
            <li>
                <Link to='/habits'>
                    <img src="" alt="" />
                    Habits
                </Link>
            </li>
            <li>
                <Link to='/tracker'>
                    <img src="" alt="" />
                    Tracker
                </Link>
            </li>
            <li>
                <Link to='/shop'>
                    <img src="" alt="" />
                    Shop
                </Link>
            </li>
            <li>
                <Link to='/levels'>
                    <img src="" alt="" />
                    Levels
                </Link>
            </li>
            <li>
                <Link to='/profile'>
                    <img src="" alt="" />
                    Profile
                </Link>
            </li>
        </ul>
    )
}