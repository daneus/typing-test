import React, { useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import WordContainer from './WordContainer';
import TextHighlight from './TextHighlight';
import { CounterContext } from '../../context/CounterContext';
import TestBar from './TestBar';
import { ArrayContext } from '../../context/ArrayContext';
import checkForHeightChange from '../../functions/checkForHeightChange';

interface Props {
  words: string[];
}

const debounce = (callback: () => void, delay = 1000) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, delay);
  };
};

const WordsContainer: React.FC<Props> = ({ words }) => {
  const [multiplier, setMultiplier] = useState({ horizontal: 0, vertical: 0 });
  const value = { multiplier, setMultiplier };

  const containerRef = useRef<HTMLDivElement>();

  const reloadPage = debounce(() => {
    Router.reload();
  });

  useEffect(() => {
    checkForHeightChange();
    window.addEventListener('resize', reloadPage);
  }, [reloadPage]);

  return (
    <>
      <ArrayContext.Provider value={words}>
        <CounterContext.Provider value={value}>
          <div ref={containerRef} className="container">
            <TextHighlight />
            {words.map((word, idx) => {
              return <WordContainer key={idx} word={word} />;
            })}
          </div>
          <TestBar />
        </CounterContext.Provider>
      </ArrayContext.Provider>
    </>
  );
};

export default WordsContainer;
