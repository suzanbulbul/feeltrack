import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Firebase
import { selectedUserInfo } from '../../utilities/firebase';

// Redux
import { selectUserInfo, updateSelectedItems, selectItems, selectUser } from "../../redux/userSlice";

// Helpers
import { flattenUserInfo } from "../../utilities/helpers/flattenUserInfo";
import { formatDate } from "../../utilities/helpers/formatDate";

// Components
import SelectedItem from '../../components/selectedItem';
import Loading from '../../components/loading';

const DailyList = () => {
  const dispatch = useDispatch();

  const selectedItems = useSelector(selectItems);
  const info = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const flattendata = flattenUserInfo(info);
  const todayDate = formatDate();
  const checkTime = (userUid, currentDate, items) => {
    const now = new Date();
    if (now.getHours() === 14 && now.getMinutes() === 33) {
      selectedUserInfo(userUid, '11.10.2023', items);
    }
    if (now.getHours() === 14 && now.getMinutes() === 34) {
      const initialSelectedItems = flattendata.map(data => ({
        select: false,
        ...data,
      }));
      selectedUserInfo(userUid, currentDate, initialSelectedItems);
    }
  };

  useEffect(() => {
    checkTime(user.uid, todayDate, selectedItems);

    const intervalId = setInterval(() => {
      checkTime(user.uid, todayDate, selectedItems);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch, selectedItems, todayDate, user.uid]);

  const handleItemSelect = (selectedItem) => {
    const selectedItemIndex = selectedItems.findIndex(item => item.key === selectedItem.key);
    if (selectedItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[selectedItemIndex] = {
        select: !selectedItem.select,
        ...selectedItem,
      };
      dispatch(updateSelectedItems(updatedItems));
      selectedUserInfo(user.uid, todayDate, updatedItems);
    }
  };

  if (!selectedItems || selectedItems.length === 0) {
    return <><h1>test</h1><Loading /></>;
  }

  return (
    <div>
      {/* <ul>
        {selectedItems.map((data, id) => (
          <li key={id}>
            <SelectedItem data={data} onItemSelect={handleItemSelect} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default DailyList;
