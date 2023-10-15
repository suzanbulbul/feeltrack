import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//Firebase
import { submittedUserInfo, getCompletedDays } from '../../utilities/firebase';

//Redux
import { selectUserInfo, selectUser } from '../../redux/userSlice';

//Helpers
import { flattenUserInfo } from '../../utilities/helpers/flattenUserInfo';
import { formatDate } from '../../utilities/helpers/formatDate';

//Components
import SelectedItem from '../../components/selectedItem';
import Loading from '../../components/loading';

const DailyList = () => {
  const [dailyData, setDailyData] = useState([]);

  const info = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  const todayDate = formatDate();

  useEffect(() => {
    completedUserInfo();
  }, []);

  const emptyCompletedData = async () => {
    const initialFlattenedData = flattenUserInfo(info);
    try {
      const initialData = await submittedUserInfo(user.uid, todayDate, initialFlattenedData);
      const dataArray = Object.values(initialData);
      setDailyData(dataArray[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const completedUserInfo = async () => {
    try {
      const completedData = await getCompletedDays(user.uid, todayDate);

      if(completedData === null || completedData === undefined){
        emptyCompletedData();
      }
      else{
        setDailyData(completedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemSelect = async (data) => {
    const updatedDailyData = dailyData.map((item) => {
      if (item.key === data.key) {
        item.selected = data.selected;
      }
      return item;
    });
    submittedUserInfo(user.uid, todayDate, updatedDailyData)
    setDailyData(updatedDailyData);
  };

  if(!dailyData || dailyData === undefined){
    return <Loading />
  }

  return (
    <div>
       <ul>
        {dailyData.map((data, id) => (
          <li key={id}>
            <SelectedItem data={data} onItemSelect={handleItemSelect} />
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default DailyList;
