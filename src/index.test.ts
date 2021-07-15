import { formatAsCurrency, FormatAsCurrencyOptions } from '.';

describe('formatAsCurrency', () => {
  let originalDefaultOptions: FormatAsCurrencyOptions;

  beforeAll(() => {
    originalDefaultOptions = { ...formatAsCurrency.defaultOptions };
  });

  beforeEach(() => {
    formatAsCurrency.defaultOptions = { ...originalDefaultOptions };
  });

  it.each`
    inputValue      | expectedResult
    ${0}            | ${'$0.00'}
    ${10}           | ${'$10.00'}
    ${100}          | ${'$100.00'}
    ${1000}         | ${'$1,000.00'}
    ${9999999.99}   | ${'$9,999,999.99'}
    ${9999999.9999} | ${'$9,999,999.99'}
  `('should format number as currency', ({ inputValue, expectedResult }) => {
    const formatted = formatAsCurrency(inputValue);
    expect(formatted).toEqual(expectedResult);
  });

  it('should accept a different locale', () => {
    const formatted = formatAsCurrency(1000, {
      currency: 'BRL',
      locale: 'pt-BR',
    });
    expect(formatted).toEqual('R$ 1.000,00');
  });

  it('should accept default options to format a number', () => {
    formatAsCurrency.defaultOptions = {
      currency: 'BRL',
      locale: 'pt-BR',
    };
    const formatted = formatAsCurrency(1000);
    expect(formatted).toEqual('R$ 1.000,00');
  });

  it('should not round number', () => {
    const formatted = formatAsCurrency(1.999999);
    expect(formatted).toEqual('$1.99');
  });
});
