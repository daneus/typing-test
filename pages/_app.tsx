import type { AppProps } from 'next/app';
import '../sass/main.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps}></Component>
    </>
  );
};

export default MyApp;
