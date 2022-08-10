import React from 'react';
import Header from '../components/headerComponents/Header';
import Body from '../components/bodyComponents/Body';
import axios from 'axios';
import Head from 'next/head';

interface Props {
  words: string[];
}

const App: React.FC<Props> = ({ words }) => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://www.iconpacks.net/icons/1/free-keyboard-icon-1425-thumb.png"
        />
        <title>Typing Test</title>
        <meta
          name="description"
          content="This is a website made to test typing speed."
        />
      </Head>
      <Header />
      <Body words={words} />
    </>
  );
};

export const getStaticProps = async () => {
  const BASE_URL =
    'https://raw.githubusercontent.com/daneus/infinite-scrolling/main/public/words.json';

  let wordsFetched: string[];
  let wordsArray: string[] = [];

  const response = await axios.get(BASE_URL);
  wordsFetched = response.data;

  for (let i = 0; i < 33; i++) {
    const randomIndex = Math.floor(Math.random() * 1000);
    wordsArray.push(wordsFetched[randomIndex]);
  }

  return { props: { words: wordsArray } };
};

export default App;
