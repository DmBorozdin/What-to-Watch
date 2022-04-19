import {Time} from "../const";
import dayjs from "dayjs";

export const getTimeInFormatHM = (time) => {
  if (time < Time.MINUTE_IN_HOUR) {
    return `${time}m`;
  }

  const hourInTime = Math.floor(time / Time.MINUTE_IN_HOUR);
  const minuteInTime = time - (hourInTime * Time.MINUTE_IN_HOUR);
  return `${hourInTime}h ${minuteInTime}m`;
};

export const getTimeInFormatHMS = (time) => {
  if (time < Time.SECOND_IN_MINUTE) {
    return `0:00:${time}`;
  }

  const hourInTime = Math.floor(time / Time.SECOND_IN_HOUR);
  const minuteInTime = Math.floor((time - (hourInTime * Time.SECOND_IN_HOUR)) / Time.SECOND_IN_MINUTE);
  const secondInTime = Math.round(time - hourInTime * Time.SECOND_IN_HOUR - minuteInTime * Time.SECOND_IN_MINUTE);
  return `${hourInTime}:${minuteInTime > 9 ? minuteInTime : `0${minuteInTime}`}:${secondInTime > 9 ? secondInTime : `0${secondInTime}`}`;
};

export const getDateInFormatMDY = (date) => date === null ? `` : dayjs(date).format(`MMMM D, YYYY`);

export const getDateInFormatYMD = (date) => date === null ? `` : dayjs(date).format(`YYYY-MM-DD`);

export const shuffleArray = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const RANDOM_INDEX = Math.floor(Math.random() * (index + 1));
    [array[index], array[RANDOM_INDEX]] = [array[RANDOM_INDEX], array[index]];
  }

  return array;
};
