import React, { useContext, useEffect, useRef, useState } from 'react';
import { ArrayContext } from '../../context/ArrayContext';
import { CounterContext } from '../../context/CounterContext';
import { WPMContext } from '../../context/WPMContext';
import checkForBreakPoints from '../../functions/checkForBreakPoints';
import checkForHeightChange from '../../functions/checkForHeightChange';
import isAlphabetical from '../../functions/isAlphabetical';

interface BreakpointArray {
  word: string;
  idx: number;
}

const Input: React.FC = () => {
  const correctWordsRef = useRef(0);
  const incorrectWordsRef = useRef(0);
  const keystrokesRef = useRef(0);

  const inputRef = useRef<HTMLInputElement>();

  const highlightContext = useContext(CounterContext);
  const arrayContext = useContext(ArrayContext);
  const wpmContext = useContext(WPMContext);

  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const breakpointsRef = useRef<BreakpointArray[]>([]);
  const breakpointIndexRef = useRef(0);

  const spansArray = useRef<NodeListOf<HTMLElement>>(null);

  const changeHorizontal = (amount: number) => {
    highlightContext.setMultiplier(prevState => ({
      ...prevState,
      horizontal: highlightContext.multiplier.horizontal + amount
    }));
  };

  const increaseVertical = () => {
    highlightContext.setMultiplier(() => ({
      horizontal: 0,
      vertical: highlightContext.multiplier.vertical + 1
    }));
  };

  const setTotalCharacters = () => {
    let totalCharacters = 0;
    arrayContext.forEach(word => {
      totalCharacters += word.length;
    });
    wpmContext.setWPMData(prevState => ({
      ...prevState,
      totalCharacters: totalCharacters
    }));
  };

  useEffect(() => {
    setTotalCharacters();
    inputRef.current.focus();
    spansArray.current = checkForHeightChange();
    breakpointsRef.current = checkForBreakPoints(spansArray.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const workingArray = spansArray.current[currentIndex]
      ?.childNodes as NodeListOf<HTMLSpanElement>;

    spansArray.current[currentIndex]?.classList.toggle(
      'incorrect',
      value.length > arrayContext[currentIndex]?.length
    );

    workingArray?.forEach((spanWithLetter, spanWithLetterIndex) => {
      if (spanWithLetter.innerText !== ' ') {
        spanWithLetter.classList.toggle(
          'correct',
          value[spanWithLetterIndex] === spanWithLetter.innerText
        );
        spanWithLetter.classList.toggle(
          'incorrect',
          value[spanWithLetterIndex] !== undefined &&
            value[spanWithLetterIndex] !== spanWithLetter.innerText
        );
      }
    });
  }, [value, currentIndex, arrayContext]);

  useEffect(() => {
    if (value === '') {
      inputRef.current.classList.remove('incorrect-input');
    }
    if (value !== '') {
      inputRef.current.classList.toggle(
        'incorrect-input',
        value !== arrayContext[currentIndex].slice(0, value.length)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <input
        id="test-input"
        disabled={disabled}
        ref={inputRef}
        value={value}
        className="test-input"
        type="text"
        autoComplete="off"
        spellCheck={false}
        onChange={e => {
          const newString = e.target.value.replace(/[^a-z']/gi, '');
          setValue(newString);
        }}
        onKeyDown={e => {
          if (currentIndex === 32) {
            console.log(wpmContext.WPMData);
            if (value + e.key === arrayContext[32]) {
              setValue('');
              const lastSpan = spansArray.current[32] as HTMLElement;
              lastSpan.classList.add('correct');
              setDisabled(prevState => !prevState);
              wpmContext.setWPMData(prevState => ({
                ...prevState,
                active: false,
                isTestOver: true
              }));
            }
          }
          if (isAlphabetical(e.key)) {
            keystrokesRef.current++;
            wpmContext.setWPMData(prevState => ({
              ...prevState,
              keystrokes: wpmContext.WPMData.keystrokes + 1,
              active: true
            }));
          }
          if (
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowDown' ||
            e.key === 'ArrowRight'
          ) {
            e.preventDefault();
          }
          if (isAlphabetical(e.key) || e.key === ' ') {
            if (!e.ctrlKey) {
              if (e.key === ' ') {
                e.preventDefault();
                setValue('');
                if (value !== '') {
                  if (value.length < arrayContext[currentIndex].length) {
                    if (
                      breakpointsRef.current[breakpointIndexRef.current]
                        .word === arrayContext[currentIndex] &&
                      breakpointsRef.current[breakpointIndexRef.current].idx ===
                        currentIndex
                    ) {
                      increaseVertical();
                      if (
                        breakpointsRef.current[breakpointIndexRef.current + 1]
                      ) {
                        breakpointIndexRef.current++;
                      }
                    } else {
                      if (currentIndex === 32) {
                        changeHorizontal(
                          arrayContext[currentIndex].length - value.length
                        );
                        setDisabled(prevState => !prevState);
                        wpmContext.setWPMData(prevState => ({
                          ...prevState,
                          active: false,
                          isTestOver: true
                        }));
                      } else {
                        changeHorizontal(
                          arrayContext[currentIndex].length - value.length + 1
                        );
                      }
                    }
                  } else {
                    if (
                      breakpointsRef.current[breakpointIndexRef.current]
                        .word === arrayContext[currentIndex] &&
                      breakpointsRef.current[breakpointIndexRef.current].idx ===
                        currentIndex
                    ) {
                      increaseVertical();
                      if (
                        breakpointsRef.current[breakpointIndexRef.current + 1]
                      ) {
                        breakpointIndexRef.current++;
                      }
                    } else {
                      if (currentIndex === 32) {
                        setDisabled(prevState => !prevState);
                        wpmContext.setWPMData(prevState => ({
                          ...prevState,
                          active: false,
                          isTestOver: true
                        }));
                      } else {
                        changeHorizontal(1);
                      }
                    }
                  }
                  if (e.target.value === arrayContext[currentIndex]) {
                    //If word is correct
                    correctWordsRef.current++;
                  } else {
                    //If word is incorrect
                    spansArray.current[currentIndex].classList.add('incorrect');
                    incorrectWordsRef.current++;
                    wpmContext.setWPMData(prevState => ({
                      ...prevState,
                      incorrectWords: wpmContext.WPMData.incorrectWords + 1,
                      incorrectCharacters:
                        wpmContext.WPMData.incorrectCharacters +
                        arrayContext[currentIndex].length
                    }));
                  }
                  setCurrentIndex(prev => prev + 1);
                }
              } else {
                if (value.length < arrayContext[currentIndex].length) {
                  changeHorizontal(1);
                }
              }
            }
          } else if (e.key === 'Backspace') {
            if (value !== '') {
              if (e.ctrlKey) {
                setValue('');
                if (value.length >= arrayContext[currentIndex].length) {
                  changeHorizontal(-arrayContext[currentIndex].length);
                } else {
                  changeHorizontal(-value.length);
                }
              } else {
                if (!(value.length > arrayContext[currentIndex].length)) {
                  changeHorizontal(-1);
                }
              }
            }
          }
        }}
      />
    </>
  );
};

export default Input;
