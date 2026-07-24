import { it, expect, describe } from 'vitest'; 
// (it) create a test
// describe = group of test
import { formatMoney } from './money';

describe('format Money', () => {
  it('formats 1999 cents as $19.99', () => {
    // expect = check if the result is correct
    expect(formatMoney(1999)).toBe('$19.99');
  }); // passed
  
  it('displays 2 decimal', () => {
    expect(formatMoney(1090)).toBe('$10.90');
    expect(formatMoney(100)).toBe('$1.00');
  }); // passed

  // 9a: test money with 0
  it('work with the number 0', () => {
    expect(formatMoney(0)).toBe("$0.00");
  });

  it('work with negative number', () => {
    expect(formatMoney(-999)).toBe('$-9.99')
    expect(formatMoney(-100)).toBe('$-1.00')
  });
}); 