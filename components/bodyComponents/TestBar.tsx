import React, { useState } from 'react';
import { WPMContext } from '../../context/WPMContext';
import Input from './Input';
import ResetButton from './ResetButton';
import Results from './Results';
import WPMShower from './WPMShower';

const TestBar: React.FC = () => {
  const [WPMData, setWPMData] = useState({
    keystrokes: 0,
    totalCharacters: 0,
    incorrectWords: 0,
    incorrectCharacters: 0,
    WPM: 0,
    timeOfTest: 0,
    active: false,
    isTestOver: false
  });

  const value = { WPMData, setWPMData };

  return (
    <WPMContext.Provider value={value}>
      <div className="test-bar">
        <Input />
        <div className="bar-items">
          <WPMShower />
          <ResetButton />
        </div>
      </div>
      <div className="results">
        <Results />
      </div>
    </WPMContext.Provider>
  );
};

export default TestBar;
