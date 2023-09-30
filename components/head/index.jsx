import React from 'react';
import Head from 'next/head';

const CustomHead  = ({ title, desc, keywords }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title ? title : "Feel Track"}</title>
      <meta name="description" content={desc ? desc : "FeelTrack is a user-friendly tool for tracking and improving your emotional well-being."} />
      <link
        rel="icon"
        href="https://firebasestorage.googleapis.com/v0/b/feel-track.appspot.com/o/logo-dark.svg?alt=media&token=4a5dd9d0-26ce-4644-b1eb-aaa79f978c07"
      />
      <meta name="keywords" content={keywords ? keywords : "emotional state tracking, emotional health, emotional well-being"} />
      <meta name="author" content="Suzan Bulbul" />
    </Head>
  );
}

export default CustomHead ;
