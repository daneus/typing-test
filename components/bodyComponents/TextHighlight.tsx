import React, { useContext } from 'react';
import { CounterContext } from '../../context/CounterContext';

const TextHighlight: React.FC = () => {
  const contextValue = useContext(CounterContext);
  const leftValue = 35 + contextValue.multiplier.horizontal * 12.82;
  const topValue = 26 + contextValue.multiplier.vertical * 38;

  return (
    <div
      className="text-hightlight"
      style={{ left: `${leftValue}px`, top: `${topValue}px` }}
    ></div>
  );
};

export default TextHighlight;
