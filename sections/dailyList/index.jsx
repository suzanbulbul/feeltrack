import React from 'react'
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

  return (
    <div>
      <div>
        {flattendata.map((data, value) => (
          <SelectedItem key={value} title={data.key} value={data.value}/>
        ))}
      </div>
    </div>
  );
}

export default DailyList