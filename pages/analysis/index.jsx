import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { selectCompletedDays } from "../../redux/userSlice"

// Helpers
import { tableMappedData } from "../../utilities/helpers/tableMappedData";

// Components
import Head from '../../components/head';
import Table from '../../components/table';
import Tab from '../../components/Tab';

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("table");

  const completedDays = useSelector(selectCompletedDays);

  const data = tableMappedData(completedDays);

  const tabs = [
    { name: "table", label: "Table Report" },
    { name: "graphic", label: "Graphic" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Head title="Feel Track - Analysis" />
      <Tab justify="center" tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
      {activeTab === "table" && <Table data={data} />}
      {activeTab === "graphic" && <h1>graphic</h1>}
    </div>
  );
}

export default Analysis;
