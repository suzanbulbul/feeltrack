import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Firebase
import { selectedUserInfo } from '../../utilities/firebase';

// Redux
import { selectUserInfo } from "../../redux/userSlice";

// Helpers
import { flattenUserInfo } from "../../utilities/helpers/flattenUserInfo";

// Components
import SelectedItem from '../../components/selectedItem';
import Loading from '../../components/loading';

const DailyList = () => {

  const info = useSelector(selectUserInfo);
  const flattendata = flattenUserInfo(info);

  const handleItemSelect = (selectedItem) => {
    console.log(selectedItem.key);
  }
  
  if (!flattendata || flattendata.length === 0) {
    return <Loading />;
  }

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
};

export default DailyList;
