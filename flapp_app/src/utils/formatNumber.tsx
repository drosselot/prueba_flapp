
export const formatNumberToChileanWithTwoDecimals = (number: number) => {
  const truncatedNumber = truncateNumberWithTwoDecimals(number);
  return formatNumberToChilean(truncatedNumber);
}

export const formatNumberToChilean = (number: number) => {
  return number.toLocaleString("de-DE");
}

export const truncateNumberWithTwoDecimals = (number: number) => {
  return parseFloat(number.toFixed(2));
}

