export const preciseData = (data, precision = 0) => {
  return data ? Number(data).toFixed(precision) : data;
};


// WEBPACK FOOTER //
// src/drone/src/src/helpers/preciseNumber.ts
