import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

//Firebase
import { getCompletedDays } from '../../utilities/firebase';

//Redux
import { selectUser } from '../../redux/userSlice';

//Helpers
import { formatDate } from '../../utilities/helpers/formatDate';

// Components
import Head from '../../components/head';
import Table from '../../components/table';
import Tab from '../../components/tab';

const Analysis = () => {
  const user = useSelector(selectUser);

  const todayDate = formatDate();

  const [activeTab, setActiveTab] = useState("table");
  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    completedUserInfo();
  }, []);

  const tabs = [
    { name: "table", label: "Table Report" },
    { name: "graphic", label: "Graphic" },
  ];

  const completedUserInfo = async () => {
    try {
      const completedData = await getCompletedDays(user.uid);
      setCompletedDays(completedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Head title="Feel Track - Analysis" />
      <Tab
        justify="center"
        tabs={tabs}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      {activeTab === "table" && <Table data={completedDays} />}
      {activeTab === "graphic" && <h1>graphic</h1>}
    </div>
  );
}

export default Analysis;
