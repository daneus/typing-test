import React, { useContext } from 'react';
import { WPMContext } from '../../context/WPMContext';

const Results: React.FC = () => {
  const wpmContext = useContext(WPMContext);

  const rawWPM =
    wpmContext.WPMData.keystrokes / 5 / (wpmContext.WPMData.timeOfTest / 60);

  const correctCharacters =
    wpmContext.WPMData.totalCharacters - wpmContext.WPMData.incorrectCharacters;

  const accuracy =
    (correctCharacters / wpmContext.WPMData.totalCharacters) * 100;

  return (
    <>
      <span className="wpm-result">
        <span>
          {wpmContext.WPMData.isTestOver && wpmContext.WPMData.WPM > 0
            ? wpmContext.WPMData.WPM
            : 0}
        </span>
        &nbsp;
        <small>WPM</small>
      </span>
      <ul role="list" className="results-list">
        <li>
          <span>Raw WPM</span>
          <span>
            {wpmContext.WPMData.isTestOver ? Math.floor(rawWPM) : '-'}
          </span>
        </li>
        <li>
          <span>Accuracy</span>
          <span>
            {wpmContext.WPMData.isTestOver ? `${accuracy.toFixed(1)}%` : '-'}
          </span>
        </li>
        <li>
          <span>Correct characters</span>
          <span>{wpmContext.WPMData.isTestOver ? correctCharacters : '-'}</span>
        </li>
        <li>
          <span>Incorrect characters</span>
          <span>
            {wpmContext.WPMData.isTestOver
              ? wpmContext.WPMData.incorrectCharacters
              : '-'}
          </span>
        </li>
      </ul>
    </>
  );
};

export default Results;
