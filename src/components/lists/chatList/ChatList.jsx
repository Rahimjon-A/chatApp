import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from '../addUser/AddUser';
import { useUserStore } from '../../../library/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../library/firebase';
import { useChatStore } from '../../../library/chatStore ';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, 'users', item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, 'userchats', currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>

        <img
          src={addMode ? './minus.png' : './plus.png'}
          alt="add"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {chats.map((chat) => (
        <div
          style={{ backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe' }}
          key={chat.id}
          className="item"
          onClick={() => handleSelect(chat)}
        >
          <img
            src={
              chat.user.bloced.includes(currentUser.id)
                ? './avatar.png'
                : chat.user.avatar || './avatar.png'
            }
            alt="avatar"
          />
          <div className="text">
            <p>{chat.user.bloced.includes(currentUser.id) ? 'User' : chat.user.username} </p>
            <span>{chat.lastMessage} </span>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
