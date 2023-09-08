import '../public/scss/style.scss'
import { Toaster } from 'react-hot-toast';

//Components
import Layout from '../components/layout';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

export default MyApp
