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
  { name: "register", label: "Kayıt Ol" },
  { name: "login", label: "Giriş Yap" },
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
          <h1 className="title">Hoş Geldiniz!</h1>
          <p className="desc">
            Duygusal sağlığınızı daha yakından takip etmek ve geliştirmek için
            buradasınız. FeelTrack size günlük duygusal durumlarınızı kaydetme
            ve izleme fırsatı sunuyor. Haydi başlayalım ve içsel yolculuğunuza
            adım atalım!
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
