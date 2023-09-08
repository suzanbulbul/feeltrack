import React, { useState } from "react";

//Firabese

//Sections
import Login from "../sections/login";
import Register from "../sections/register";
import Head from "../sections/head";

//Components
import Tab from "../components/tab";

// Styles
import styles from "./page.module.scss";

const tabs = [
  { name: "register", label: "SIGN UP" },
  { name: "login", label: "LOGIN" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("register");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Head />
      <main className={`${styles.main}`}>
        <div
          className={`hidden lg:block absolute top-10 card card-blur ${styles.card}`}
        >
          <h1 className="title">Welcome!</h1>
          <p className="desc">
          You're here to track and improve your emotional well-being more closely. FeelTrack offers you the opportunity to record and monitor your daily emotional states. Let's get started and take the first step on your inner journey!
          </p>
        </div>
        <aside >
          <div className={`form ${styles.form}`}>
            <Tab
              tabs={tabs}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
            {activeTab === "register" && <Register />}
            {activeTab === "login" && <Login />}
          </div>
        </aside>
      </main>
    </div>
  );
}
