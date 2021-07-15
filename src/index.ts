function isFloat(number: number) {
  return typeof number === 'number' && String(number).includes('.');
}

function countNumberFractionDigits(number: number) {
  if (!isFloat(number)) return 0;
  return String(number).split('.')[1].length;
}

function formatAsCurrency(number: number, options?: FormatAsCurrencyOptions) {
  if (countNumberFractionDigits(number) > 3) {
    const numberAsString = String(number);
    const indexOfFractionPoint = numberAsString.indexOf('.');
    const croppedString = numberAsString.substr(0, indexOfFractionPoint + 3);
    number = parseFloat(croppedString);
  }
  const defaultOptions = formatAsCurrency.defaultOptions;
  const locale = options?.locale ?? defaultOptions.locale;
  const currency = options?.currency ?? defaultOptions.currency;
  return number.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
  });
}

formatAsCurrency.defaultOptions = {
  locale: 'en-US',
  currency: 'USD',
};

interface FormatAsCurrencyOptions {
  locale: string;
  currency: string;
}

export {
  isFloat,
  formatAsCurrency,
  FormatAsCurrencyOptions,
  countNumberFractionDigits,
};
