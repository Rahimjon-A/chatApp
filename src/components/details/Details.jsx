import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../library/chatStore ';
import { auth, db } from '../../library/firebase';
import { useUserStore } from '../../library/userStore';
import './details.css';

const Details = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, changeBlock, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();

  const handleBlock = async() => {
      if(!user) return;

      const userDocRef = doc(db, "users", currentUser.id)
      try {
        await updateDoc(userDocRef, {
          bloced:  isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
        })
        changeBlock()
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <div className="details">
      <div className="user">
        <img src={user?.avatar || "./avatar.png" } alt="" />
        <h2>{user?.username} </h2>
        <p> </p>
      </div>

      <div className="info">
        <div className="options">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Privacy & Chat</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

          <div className="photos">
            <div className="photosItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>photo_2024.2.png</span>
              </div>
              <img src="./download.png" alt="" className="download" />
            </div>
            <div className="photosItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>photo_2024.2.png</span>
              </div>
              <img src="./download.png" alt="" className="download" />
            </div>
            <div className="photosItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>photo_2024.2.png</span>
              </div>
              <img src="./download.png" alt="" className="download" />
            </div>
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock}>
          { isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "User Blocked" : "Block User" }
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Details;
