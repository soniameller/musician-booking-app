export const formatDateToTimeStr = (inputTimestamp: Date): string => {
  const dateObject = new Date(inputTimestamp);
  const formattedTime = dateObject.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formattedTime;
};