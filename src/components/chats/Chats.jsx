import { useEffect, useRef, useState } from 'react';
import './chats.css';
import EmojiPicker from 'emoji-picker-react';

const Chats = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(()=>{
      endRef.current?.scrollIntoView({behavior: "smooth"})
  },[])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };
  return (
    <div className="chats">

      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="avatar" />
          <div className="text">
            <span>Rahimjon</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, laborum?</p>
          </div>
        </div>

        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </div>

      <div className="center">

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis animi tempora
              voluptas non commodi doloremque, nostrum quos quisquam vitae? Perferendis.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis animi tempora
              voluptas non commodi doloremque, nostrum quos quisquam vitae? Perferendis.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis animi tempora
              voluptas non commodi doloremque, nostrum quos quisquam vitae? Perferendis.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="text">
            <img src="./avatar.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis animi tempora
              voluptas non commodi doloremque, nostrum quos quisquam vitae? Perferendis.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis animi tempora
              voluptas non commodi doloremque, nostrum quos quisquam vitae? Perferendis.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

      <div ref={endRef}></div>
      </div>


      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendBtn">Send</button>
      </div>

    </div>
  );
};

export default Chats;
