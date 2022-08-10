import React from 'react';
import WordsContainer from './WordsContainer';

interface Props {
  words: string[];
}

const Body: React.FC<Props> = ({ words }) => {
  return (
    <main>
      <WordsContainer words={words} />
    </main>
  );
};

export default Body;
