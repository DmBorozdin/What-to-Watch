import {Time} from "../const";

export const getTimeInFormatHM = (time) => {
  if (time < Time.MINUTE_IN_HOUR) {
    return `${time}m`;
  }

  const hourInTime = Math.floor(time / Time.MINUTE_IN_HOUR);
  const minuteInTime = time - (hourInTime * Time.MINUTE_IN_HOUR);
  return `${hourInTime}h ${minuteInTime}m`;
};
