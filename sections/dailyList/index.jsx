import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Firebase
import { selectedUserInfo } from '../../utilities/firebase';

// Redux
import { selectUserInfo, updateSelectedItems, selectUser, selectItems } from "../../redux/userSlice";

// Helpers
import { flattenUserInfo } from "../../utilities/helpers/flattenUserInfo";
import { formatDate } from "../../utilities/helpers/formatDate";

// Components
import SelectedItem from '../../components/selectedItem';

const DailyList = () => {
  const dispatch = useDispatch();
  const info = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const selectList = useSelector(selectItems);

  const [flattendata, setFlattendata] = useState([]);

  useEffect(() => {
    const initialFlattendata = flattenUserInfo(info);
    setFlattendata(initialFlattendata);
    dispatch(updateSelectedItems(initialFlattendata));
  }, [dispatch, info]);

  const todayDate = formatDate();

  const handleItemSelect = (selectedItem) => {
    const updatedItems = flattendata.map(item => {
      if (item.key === selectedItem.key) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });

    setFlattendata(updatedItems);
    dispatch(updateSelectedItems(updatedItems));
    selectedUserInfo(user.uid, todayDate, updatedItems);
  };
  
  return (
    <div>
      <ul>
        {selectList.map((data, id) => (
          <li key={id}>
            <SelectedItem data={data} onItemSelect={handleItemSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyList;
