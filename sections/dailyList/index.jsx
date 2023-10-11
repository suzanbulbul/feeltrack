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
    if (now.getHours() === 23 && now.getMinutes() === 59) {
      selectedUserInfo(userUid, currentDate, items);
    }
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      const initialSelectedItems = flattendata.map(data => ({
        ...data,
        select: false,
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
        ...selectedItem,
        select: !selectedItem.select,
      };
      dispatch(updateSelectedItems(updatedItems));
      selectedUserInfo(user.uid, todayDate, updatedItems);
    }
  };

  if (!selectedItems || selectedItems.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <ul>
        {selectedItems.map((data, id) => (
          <li key={id}>
            <SelectedItem data={data} onItemSelect={handleItemSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyList;
