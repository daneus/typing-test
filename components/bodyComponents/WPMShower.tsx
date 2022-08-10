import React, { useContext, useState, useRef, useEffect } from 'react';
import { WPMContext } from '../../context/WPMContext';

const WPMShower: React.FC = () => {
  const wpmContext = useContext(WPMContext);

  const [seconds, setSeconds] = useState(0);
  const [netWPM, setNetWPM] = useState(0);

  const secondsTimer = useRef<ReturnType<typeof setInterval>>();

  const addOneSecond = () => {
    setSeconds(prev => prev + 1);
  };

  useEffect(() => {
    if (wpmContext.WPMData.isTestOver) {
      wpmContext.setWPMData(prevState => ({
        ...prevState,
        WPM: Math.floor(netWPM),
        timeOfTest: seconds
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wpmContext.WPMData.isTestOver]);

  useEffect(() => {
    if (!wpmContext.WPMData.active) {
      clearInterval(secondsTimer.current);
    } else {
      secondsTimer.current = setInterval(addOneSecond, 1000);
      return () => clearInterval(secondsTimer.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wpmContext.WPMData.active]);

  useEffect(() => {
    setNetWPM(
      (wpmContext.WPMData.keystrokes / 5 - wpmContext.WPMData.incorrectWords) /
        (seconds / 60)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <div className="wpm-shower">
      <span>
        <span className="wpm" style={{ fontWeight: '500' }}>
          {netWPM > 0 ? Math.floor(netWPM) : 0}
        </span>
        &nbsp;<small>WPM</small>
      </span>
    </div>
  );
};

export default WPMShower;
