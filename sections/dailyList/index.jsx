import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Store
import { selectUserInfo } from "../../redux/userSlice";

// Helpers
import { flattenUserInfo } from "../../utilities/helpers/flattenUserInfo";

//Components
import SelectedItem from '../../components/selectedItem';

const DailyList = () => {
  const info = useSelector(selectUserInfo);
  const flattendata = flattenUserInfo(info);

  const initialSelectedItems = flattendata.map(data => ({
    ...data,
    select: false,
  }));

  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const handleItemSelect = (selectedItem) => {
    const selectedItemIndex = selectedItems.findIndex(item => item.key === selectedItem.key);
    if (selectedItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[selectedItemIndex] = {
        ...selectedItem,
        select: !selectedItem.select,
      };
      setSelectedItems(updatedItems);
    }
  };

  return (
    <div>
      <ul>
        {flattendata.map((data, id) => (
          <li key={id}>
            <SelectedItem data={data} onItemSelect={handleItemSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyList;
