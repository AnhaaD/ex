import * as moment from 'moment-timezone';
import { getTimezone } from './timezone';

export const localeDate = (date, format, timezone = getTimezone()) => {
    const getFormat = type => {
        return {
            fullDate: 'YYYY-DD-MM HH:mm:ss',
            historyDate: 'MMM DD, YYYY h:mm A',
            shortDate: 'YYYY-DD-MM HH:mm',
            time: 'HH:mm:ss',
          }[type];
    };
    const formatDisplay = getFormat(format);
    const isUnix = typeof date === 'number';
    const momentObj = isUnix ? moment.unix(date) : moment(date);
    return momentObj.tz(timezone).format(formatDisplay);
};


// WEBPACK FOOTER //
// src/drone/src/src/helpers/localeDate.ts
