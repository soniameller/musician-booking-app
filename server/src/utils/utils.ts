/**
 * Adjusts the dateTime to use the current date while keeping the original time.
 * @param {Date | string} originalDateTime - The original dateTime from the model.
 * @returns {string} The ISO string of the adjusted dateTime with today's date and original time.
 */
export const adjustDateTimeToCurrentDate = (originalDateTime): Date => {
  const currentDate = new Date();
  const originalDate = new Date(originalDateTime);

  currentDate.setHours(
    originalDate.getHours(),
    originalDate.getMinutes(),
    originalDate.getSeconds(),
    originalDate.getMilliseconds()
  );

  return currentDate;
};
