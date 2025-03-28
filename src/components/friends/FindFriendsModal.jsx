import { useState } from "react";
import close from "../../assets/close.svg";
import { userService } from "../../services/userService";
import { friendsService } from "../../services/friendsService";
import MessageModal from "../layout/MessageModal";
import { useTranslation } from "react-i18next";

export default function FindFriendsModal({ onClose }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [message, setMessage] = useState(t('findFriendsModal.usersWillBeShown'));
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (inputValue) {
      const response = await userService.searchUsers(inputValue);
      setFoundUsers(response.data);
    } else {
      setFoundUsers([]);
      setMessage(t('findFriendsModal.noUsersFound'));
    }
  }

  async function handleSendRequest(friendId) {
    try {
      const response = await friendsService.sendFriendshipRequest(friendId);
      console.log(response.data);
      setModalMessage(t('findFriendsModal.requestSent'));
    } catch (error) {
      setModalMessage(error.response?.data?.message || t('findFriendsModal.serverError'));
    } finally {
      setIsMessageModalVisible(true);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen fixed inset-0"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="bg-[#D9D9D9] relative w-full max-w-[350px] px-8 py-12 border-2 border-[#292139] rounded-md min-h-[500px]">
        <p className="text-center font-semibold text-2xl mb-5">{t('findFriendsModal.title')}</p>
        <form>
          <div className="relative mb-5">
            <input
              className="border-2 border-[#292139] w-full rounded-sm shadow-lg text-lg pl-3 pr-15 py-2 bg-white"
              name="input"
              id="input"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder={t('findFriendsModal.placeholder')}
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 h-full border-2 w-[50px] rounded-sm bg-[#382c9c]"
            >
              <svg
                className="mx-auto"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L13 13M1 8C1 8.91925 1.18106 9.82951 1.53284 10.6788C1.88463 11.5281 2.40024 12.2997 3.05025 12.9497C3.70026 13.5998 4.47194 14.1154 5.32122 14.4672C6.1705 14.8189 7.08075 15 8 15C8.91925 15 9.82951 14.8189 10.6788 14.4672C11.5281 14.1154 12.2997 13.5998 12.9497 12.9497C13.5998 12.2997 14.1154 11.5281 14.4672 10.6788C14.8189 9.82951 15 8.91925 15 8C15 7.08075 14.8189 6.1705 14.4672 5.32122C14.1154 4.47194 13.5998 3.70026 12.9497 3.05025C12.2997 2.40024 11.5281 1.88463 10.6788 1.53284C9.82951 1.18106 8.91925 1 8 1C7.08075 1 6.1705 1.18106 5.32122 1.53284C4.47194 1.88463 3.70026 2.40024 3.05025 3.05025C2.40024 3.70026 1.88463 4.47194 1.53284 5.32122C1.18106 6.1705 1 7.08075 1 8Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
        <ul className="flex flex-col gap-5 max-h-[330px] overflow-scroll">
          {foundUsers.length === 0 ? (
            <p className="text-center text-xl max-w-[230px] mx-auto">{message}</p>
          ) : (
            foundUsers?.map((user) => (
              <li
                key={user.id}
                className="flex flex-col gap-5 bg-white border-2 border-[#292139] rounded-md shadow-lg px-6 py-3"
              >
                <div className="flex flex-col">
                  <p className="text-xl font-bold">{user.username}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
                <button
                  onClick={() => handleSendRequest(user.id)}
                  className="bg-purple-700 text-white font-bold text-lg tracking-wider border border-[#292139] rounded-md shadow-lg"
                >
                  {t('findFriendsModal.sendRequest')}
                </button>
              </li>
            ))
          )}
        </ul>
        <button onClick={onClose} className="absolute top-5 right-7">
          <img src={close} alt="Close Stats Modal" className="min-w-[15px]" />
        </button>
      </div>
      {isMessageModalVisible && (
        <MessageModal
          message={modalMessage}
          onClose={() => setIsMessageModalVisible(false)}
        />
      )}
    </div>
  );
}