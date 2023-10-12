import React, { useState } from 'react';

// Components
import Checkbox from '../checkbox';

// Icons
import { BsSun  } from 'react-icons/bs';
import { BiSolidMoon } from 'react-icons/bi';
import { IoIosFitness } from 'react-icons/io';
import { RiCalendarTodoLine } from 'react-icons/ri'; 

const SelectedItem = ({ data, onItemSelect }) => {
  const [checked, setChecked] = useState(data.selected);

  let selectedIcon;

  if (data.key === "bedtime") {
    selectedIcon = <BiSolidMoon className='icon bedtime'/>;
  } else if (data.key === "wakeupTime") {
    selectedIcon = <BsSun className='icon wakeup'/>;
  } else if (data.key === "exercise") {
    selectedIcon = <IoIosFitness className='icon exercise'/>;
  } else {
    selectedIcon = <RiCalendarTodoLine className='icon todo'/>;
  }

  const handleSelectChange = () => {
    setChecked(!checked);
    const newData = {
      key: data.key,
      title: data.title,
      value: data.value,
      selected: !checked,
    };
    onItemSelect(newData);
  };

  return (
    <button onClick={handleSelectChange} className="checkItem w-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {selectedIcon}
          <div className="flex items-center justify-between">
            <h5 className="desc mr-4">
              {data.title}
            </h5>
            <p className="title">
              {data.value} 
            </p>
          </div>
        </div>
        <Checkbox checked={checked} />
      </div>
    </button>
  );
};

export default SelectedItem;
