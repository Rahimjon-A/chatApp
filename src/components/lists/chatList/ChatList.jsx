import { useState } from 'react';
import './chatList.css';
import AddUser from '../addUser/AddUser';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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

      <div className="item">
        <img src="./avatar.png" alt="avatar" />
        <div className="text">
          <p>Rahimjon</p>
          <span>Hello there</span>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="avatar" />
        <div className="text">
          <p>Rahimjon</p>
          <span>Hello there</span>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="avatar" />
        <div className="text">
          <p>Rahimjon</p>
          <span>Hello there</span>
        </div>
      </div>

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
