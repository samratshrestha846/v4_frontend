export default function useRainfallDateSelectDropdown() {
  const getDropdownText = (value: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    if (todayMonth - value - 1 < 0) {
      const desiredMonth = months[12 + todayMonth - value - 1];
      const desiredYear = year - 1;
      return `${desiredMonth} ${desiredYear}`;
    }
    const desiredMonth = months[todayMonth - value - 1];
    const desiredYear = year;
    return `${desiredMonth} ${desiredYear}`;
  };

  // Create options for react-select
  const options = [...Array(12).keys()].map((month) => ({
    value: month + 1,
    label: getDropdownText(month + 1),
  }));

  return {
    options,
  };
}
