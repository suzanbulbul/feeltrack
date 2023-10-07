import React from 'react'
import { useSelector } from "react-redux";

// Redux
import { selectUser } from "../../redux/userSlice";

// Helpers
import { formatDate } from '../../utilities/helpers/formatDate';

//Icons
import { PiPencilCircleBold } from "react-icons/pi";
import { FaRegHandSpock } from "react-icons/fa";



const Banner = () => {
  const user = useSelector(selectUser);

  const date = formatDate();

  return (
    <div className='banner'>
      {user && (
        <div className="flex justify-between mb-10">
          <div>
            <p className="title">
              Hey <b className="custom-capitalize ms-2">{user.displayName}</b>
              <FaRegHandSpock className="icon"/>
            </p>
            <p className='title'> <b className='me-2'>FeedTrick</b> ile güne başla
                <PiPencilCircleBold className="icon"/>
            </p>
          </div>

          <label className='label'>{date}</label>
        </div>
      )}
    </div>
  );
}

export default Banner