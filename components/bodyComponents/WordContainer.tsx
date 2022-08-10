import React from 'react';

interface Props {
  word: string;
}

const WordContainer: React.FC<Props> = ({ word }) => {
  return (
    <span className="test-word">
      {word.split('').map((letter, idx) => {
        return <span key={idx}>{letter}</span>;
      })}
      <span> </span>
    </span>
  );
};

export default React.memo(WordContainer);
