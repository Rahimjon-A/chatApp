import './details.css';

const Details = () => {
  return (
    <div className="details">

      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Rahimjon</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, culpa.</p>
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
              <img src="./download.png" alt="" className='download' />
            </div>
            <div className="photosItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>photo_2024.2.png</span>
              </div>
              <img src="./download.png" alt="" className='download' />
            </div>
            <div className="photosItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>photo_2024.2.png</span>
              </div>
              <img src="./download.png" alt="" className='download' />
            </div>
            
          </div>
          
        </div>

        <div className="options">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button>Block User</button>
        <button className='logout'>Logout</button>
      </div>
    </div>
  );
};

export default Details;
