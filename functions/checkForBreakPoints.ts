interface ReturnType {
  word: string;
  idx: number;
}

const checkForBreakPoints = (
  divsArray: NodeListOf<HTMLElement>
): ReturnType[] => {
  const returnArray: ReturnType[] = [];
  divsArray.forEach((div, idx) => {
    if (div.classList.contains('break-point')) {
      returnArray.push({
        word: div.textContent.trim(),
        idx: idx
      });
    }
  });
  return returnArray;
};

export default checkForBreakPoints;
