import Lists from './components/lists/Lists';
import Chats from './components/chats/Chats';
import Details from './components/details/Details';
import Login from './components/login/Login';
import Warning from './components/warning/Warning';

const App = () => {
  const user = true;

  return (
    <div className="container">
      {user ? (
        <>
          <Lists />
          <Chats />
          <Details />
        </>
      ) : (
        <Login />
        )}
      <Warning/>
    </div>
  );
};

export default App;
