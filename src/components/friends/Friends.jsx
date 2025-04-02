import { useNavigate } from "react-router-dom";
import Navigation from "../layout/Navigation";
import useFetch from "../hooks/useFetch";
import { friendsService } from "../../services/friendsService";
import { useState } from "react";
import FindFriendsModal from "./FindFriendsModal";
import FriendRequests from "./FriendRequests";
import arrow from '../../assets/arrow-bottom.png';
import FriendsList from "./FriendsList";
import { useTranslation } from "react-i18next";
import Spinner from "../layout/Spinner";

export default function Friends() {
  const { t } = useTranslation();
  const { data: friends, refetch: refetchFriends } = useFetch(friendsService.getUserFriends);
  const [isFindModalOpen, setIsFindModalOpen] = useState(false);
  const [requestsVisible, setRequestsVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {friends ? (
        <div className="min-h-screen py-10">
          <div className="flex justify-center">
            <div className="bg-[#D9D9D9] w-full max-w-[350px] border-2 border-[#292139] rounded-md py-8 px-6 min-h-[600px]">
              <button
                onClick={() => navigate(-1)}
                className="text-white bg-purple-800 font-bold px-5 border-2 border-[#292139] rounded-sm shadow-lg mb-8"
              >
                {t('friends.goBack')}
              </button>
              <button
                onClick={() => setIsFindModalOpen(true)}
                className="w-full text-center mb-6 text-lg border-2 rounded-md shadow-md tracking-wider font-semibold bg-white"
              >
                {t('friends.findFriends')}
              </button>
              <div
                onClick={() => setRequestsVisible((prev) => !prev)}
                className="mb-5 bg-white rounded-md border-2 border-[#292139] px-5 pt-3"
              >
                <div className="flex justify-between items-center text-xl font-bold mb-3">
                  <div>
                    <p>{t('friends.friendRequests')}</p>
                  </div>
                  <img
                    src={arrow}
                    alt="Show/Hide"
                    className={`transition-transform duration-300 ${requestsVisible ? 'rotate-180' : ''}`}
                  />
                </div>
                {requestsVisible && <FriendRequests refetchFriends={refetchFriends} />}
              </div>
              <p className="text-2xl text-center font-bold mb-5">{t('friends.yourFriends')}</p>
              <FriendsList friends={friends} refetchFriends={refetchFriends}/>
            </div>
          </div>
          <Navigation />
          {isFindModalOpen && <FindFriendsModal onClose={() => setIsFindModalOpen(false)} />}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Spinner />
        </div>
      )}
    </div>
  );
}