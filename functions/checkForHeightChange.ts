const checkForHeightChange = () => {
  const testWordsArray: NodeListOf<HTMLElement> =
    document.querySelectorAll('.test-word');

  let initialHeight = testWordsArray[0].getBoundingClientRect().top;

  testWordsArray.forEach(element => {
    if (element.getBoundingClientRect().top > initialHeight) {
      element.previousElementSibling.classList.add('break-point');
      initialHeight = element.getBoundingClientRect().top;
    }
  });

  return testWordsArray;
};

export default checkForHeightChange;
