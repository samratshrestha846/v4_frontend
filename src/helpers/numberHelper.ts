const commaSeperatedNumber = (number: number) => {
  if (number < 1000) {
    return String(number);
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default commaSeperatedNumber;

export const getRandomNumber = (startNumber = 0, endNumber = 10) => {
  if (typeof startNumber !== 'number' && typeof endNumber !== 'number') {
    return 0;
  }

  if (startNumber >= endNumber) {
    return startNumber;
  }

  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const range = endNumber - startNumber + 1; // inclusive endNumber
  return (array[0] % range) + startNumber;
};
