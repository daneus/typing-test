import { createContext } from 'react';

interface CounterContextInterface {
  multiplier: {
    horizontal: number;
    vertical: number;
  };
  setMultiplier: React.Dispatch<
    React.SetStateAction<{ horizontal: number; vertical: number }>
  >;
}

export const CounterContext = createContext<CounterContextInterface>({
  multiplier: { horizontal: 0, vertical: 0 },
  setMultiplier: () => {}
});
