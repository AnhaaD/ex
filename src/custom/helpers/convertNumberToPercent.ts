import { Decimal } from '../../openware';

export const convertToPercent = (value: number | string): string => {
    const percentagedValue = Number(Decimal.format(Math.abs(+value), 4)) * 100;
    if (value < 0 && percentagedValue > 0) {
        return `-${(percentagedValue)}%`;
    }
    return `+${(percentagedValue)}%`;
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/helpers/convertNumberToPercent.ts
