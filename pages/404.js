import React from 'react';
import Lottie from 'lottie-react';
import notFound from '../public/animations/not-found.json';

// Components
import Head from '../components/head';

const Custom404 = () => {
  return (
    <div className='not-found'>
      <Head 
        title= "Page Not Found"
        desc= "The page you are looking for does not exist."
        keywords= "page not found, 404"
      />
      <Lottie className='animation' animationData={notFound} />
    </div>
  );
};

export default Custom404;

  