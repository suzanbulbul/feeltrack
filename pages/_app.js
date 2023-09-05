import '../public/scss/style.scss'
import { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp
