import './addUser.css';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../library/firebase';
import { useState } from 'react';
import { useUserStore } from '../../../library/userStore';

const AddUser = () => {

  const [user, setUser] = useState(null);
  const {currentUser} = useUserStore()

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');

    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
      const chatRef = collection(db, "chats");
      const userChatsRef = collection(db, "userchats")
    try {

      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })


      await updateDoc(doc(userChatsRef, user.id),{
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      });

      await updateDoc(doc(userChatsRef, currentUser.id),{
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      })

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder="Username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png" } alt="" />
            <span>{user.username} </span>
          </div>
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
