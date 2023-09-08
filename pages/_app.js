
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

//Components
import Layout from '../components/layout';
import { Toaster } from 'react-hot-toast';

//Styles
import '../public/scss/style.scss'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </Provider>
  );
}

export default MyApp
