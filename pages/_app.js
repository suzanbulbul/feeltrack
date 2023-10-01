
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Toaster } from 'react-hot-toast';

//Components
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';

//Styles
import '../public/scss/style.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Wrapper>
    </Provider>
  );
}

export default MyApp
