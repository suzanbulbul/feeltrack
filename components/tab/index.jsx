import React from "react";

const Tab = ({ tabs, activeTab, handleTabClick, justify }) => {
  return (
    <div
      className={`flex justify mb-4 justify-${
        justify ? justify : `between`
      }`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={`tab ${activeTab === tab.name ? `active` : ``}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
