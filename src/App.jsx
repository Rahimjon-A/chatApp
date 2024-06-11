import Lists from './components/lists/Lists';
import Chats from './components/chats/Chats';
import Details from './components/details/Details';
import Login from './components/login/Login';
import Warning from './components/warning/Warning';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './library/firebase';
import { useUserStore } from './library/userStore';
import { useChatStore } from './library/chatStore ';

const App = () => {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  const {chatId} = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <Lists />
        {chatId &&  <Chats />}
        {chatId &&  <Details />}
        </>
      ) : (
        <Login />
      )}
      <Warning />
    </div>
  );
};

export default App;
