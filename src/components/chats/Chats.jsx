import { useEffect, useRef, useState } from 'react';
import './chats.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../library/firebase';
import { useChatStore } from '../../library/chatStore ';
import { useUserStore } from '../../library/userStore';
import upload from '../../library/upload';
import { format } from 'timeago.js';

const Chats = () => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState();
  const [text, setText] = useState('');
  const [img, setImg] = useState({
    file: null,
    url: '',
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChats(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text.trim() == '') return;
    let imgURL = null;

    try {
      if (img.file) {
        imgURL = await upload(img.file);
      }

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
          ...(imgURL && { img: imgURL }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, 'userchats', id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setImg({
        file: null,
        url: '',
      });

      setText('');
    }
  };

  return (
    <div className="chats">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || './avatar.png'} alt="avatar" />
          <div className="text">
            <span>{user?.username} </span>
            <p></p>
          </div>
        </div>

        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </div>

      <div className="center">
        {chats?.messages?.map((message) => (
          <div
            key={message?.createdAt}
            className={message.senderId === currentUser?.id ? 'message own' : 'message'}
          >
            <div className="text">
              {message.img && <img src={message.img || './avatar.png'} alt="" />}
              <p>{message.text}</p>
              {/* <span>{ format(message?.createdAt?.toDate()) }</span>  */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="text">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">

          <label htmlFor="file" className='file' disabled={isCurrentUserBlocked || isReceiverBlocked}>
            <img src="./img.png" alt="" />
          </label>

          <input type="file" id="file" hidden onChange={handleImg} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? 'You cannot send a message'
              : 'Type a message...'
          }
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendBtn"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
