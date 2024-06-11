import{ useState } from 'react';
import "./login.css"
import { toast } from 'react-toastify';
const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e)=> {
    e.preventDefault()
    toast.warn('Email or Passwort is invalid!')
  }
  return (
    <div className="login">

      <div className="item">
        <h3>Welcome Back!</h3>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>

      <div className="line"></div>

      <div className="item">
        <h3>Create An Account</h3>
        <form>

          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            <span>UPload an Image</span>
          </label>

          <input type="file" placeholder="File" id="file" hidden onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
