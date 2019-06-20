export const convertNumberToShortFormat = (value: string): string => {
    const convertedNumber = value.length ? parseFloat(value) : 0;

    if (convertedNumber < 10000) {
        return '<10K';
    } else {
        if (convertedNumber < 50000) {
            return '10K - 50K';
        } else {
            if (convertedNumber < 250000) {
                return '50K - 250K';
            } else {
                if (convertedNumber < 1000000) {
                    return '250K - 1MIL';
                } else {
                    if (convertedNumber < 5000000) {
                        return '1MIL - 5MIL';
                    } else {
                        return '>5MIL';
                    }
                }
            }
        }
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/helpers/convertNumberToRange.ts
