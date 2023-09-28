import React, { useState } from 'react';

// Components
import Checkbox from '../checkbox';

// Icons
import { BsSun  } from 'react-icons/bs';
import { BiSolidMoon } from 'react-icons/bi';
import { IoIosFitness } from 'react-icons/io';
import { RiCalendarTodoLine } from 'react-icons/ri'; 

const SelectedItem = ({ title, value }) => {
  const [checked, setChecked] = useState(false);

  let selectedIcon;
  if (title === "bedtime") {
    selectedIcon = <BiSolidMoon className='icon bedtime'/>;
  } else if (title === "wakeupTime") {
    selectedIcon = <BsSun className='icon wakeup'/>;
  } else if (title === "exercise") {
    selectedIcon = <IoIosFitness className='icon exercise'/>;
  } else {
    selectedIcon = <RiCalendarTodoLine className='icon todo'/>;
  }

  return (
    <button onClick={() => setChecked(!checked)} className="checkItem w-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {selectedIcon}
          <span className="title">
            {title} {value}
          </span>
        </div>
        <Checkbox checked={checked} />
      </div>
    </button>
  );
};

export default SelectedItem;
