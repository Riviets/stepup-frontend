import { useTranslation } from "react-i18next"
import { useState } from "react"
import ConfirmModal from "../layout/ConfirmModal"
import MessageModal from "../layout/MessageModal"
import { friendsService } from "../../services/friendsService"
import pfpDefault from '../../assets/pfp-default.png'
import { getAvatarUrl } from "../../lib/utils"

export default function FriendsList({ friends, refetchFriends }) {
  const { t } = useTranslation()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedFriendId, setSelectedFriendId] = useState(null)

  async function handleDelete() {
    try {
      const response = await friendsService.deleteFriend(selectedFriendId)
      setMessage(response.data.message)
      refetchFriends()
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`)
    } finally {
      setIsMessageModalVisible(true)
      setIsConfirmModalOpen(false)
    }
  }

  return (
    <div>
      {friends?.length === 0 ? (
        <p className="text-xl text-center font-bold">{t('friends.noFriends')}</p>
      ) : (
        <ul className="flex flex-col gap-5 max-h-[300px] overflow-scroll">
          {friends?.map((friend) => (
            <li
              key={friend.id}
              className="flex flex-col gap-5 bg-white px-5 py-4 border border-[#292139] rounded-md shadow-md"
            >
              <div className="flex justify-between gap-3 flex-wrap w-full items-center">
                <div className="flex items-center gap-4">
                  <img
                    className="border-2 border-[#292139] rounded-lg w-[50px] h-[50px] object-cover shadow-lg"
                    src={getAvatarUrl(friend)}
                    alt={`${friend.username}'s avatar`}
                    onError={(e) => { e.target.src = pfpDefault; }}
                  />
                  <div className="flex flex-col">
                    <p className="text-xl font-bold">{friend.username}</p>
                    <p className="text-sm">{friend.email}</p>
                  </div>
                </div>
                <div className="habit-btn">
                  <button
                    onClick={() => {
                      setIsConfirmModalOpen(true);
                      setSelectedFriendId(friend.id);
                    }}
                    className="text-2xl font-bold -mt-[3px]"
                  >
                    -
                  </button>
                </div>
              </div>
              <button className="bg-purple-700 text-white font-bold text-lg tracking-wider border border-[#292139] rounded-md shadow-lg">
                {t('friendsList.proposeHabit')}
              </button>
            </li>
          ))}
        </ul>
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDelete}
          message={t('friendsList.deleteFriend') + '?'}
        />
      )}
      {isMessageModalVisible && (
        <MessageModal
          onClose={() => setIsMessageModalVisible(false)}
          message={message}
        />
      )}
    </div>
  );
}