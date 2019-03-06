import { MemoizeUntil } from '../index';

test('Basic Functionality', () => {
  const val = MemoizeUntil.fetch('hour', 'default', () => 'ComplexOperation');
  const memoized = MemoizeUntil.fetch('hour', 'default', () => 'NewComplexOperation');
  expect(val).toBe(memoized);
});

test('Expiry test', () => {
  const val = MemoizeUntil.fetch('min', 'default', () => 'ComplexOperation');
 
  setTimeout(() => {
    const memoized = MemoizeUntil.fetch('min', 'default', () => 'NewComplexOperation');
    expect(memoized).toBe('NewComplexOperation');
  }, 1000);
});