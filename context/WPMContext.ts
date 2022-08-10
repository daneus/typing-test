import { createContext } from 'react';

interface WPMContextInterface {
  WPMData: {
    keystrokes: number;
    totalCharacters: number;
    incorrectWords: number;
    incorrectCharacters: number;
    WPM: number;
    timeOfTest: number;
    active: boolean;
    isTestOver: boolean;
  };
  setWPMData: React.Dispatch<
    React.SetStateAction<{
      keystrokes: number;
      totalCharacters: number;
      incorrectWords: number;
      incorrectCharacters: number;
      WPM: number;
      timeOfTest: number;
      active: boolean;
      isTestOver: boolean;
    }>
  >;
}

export const WPMContext = createContext<WPMContextInterface>({
  WPMData: {
    keystrokes: 0,
    totalCharacters: 0,
    incorrectWords: 0,
    incorrectCharacters: 0,
    WPM: 0,
    timeOfTest: 0,
    active: false,
    isTestOver: false
  },
  setWPMData: () => {}
});
