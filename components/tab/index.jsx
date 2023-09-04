import React from "react";

// ${tab.name === "register" ? "test" : "test1"}

const Tab = ({ tabs, activeTab, handleTabClick }) => {
  return (
    <div className="flex justify-between mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={`tab ${
            activeTab === tab.name
              ? `active`
              : ``
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
