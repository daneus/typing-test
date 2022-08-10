const isAlphabetical = (letter: string) => {
  if (letter.length > 1) {
    return false;
  }
  const alphanumericRegex = /^[a-z']+$/i;
  return alphanumericRegex.test(letter);
};

export default isAlphabetical;
