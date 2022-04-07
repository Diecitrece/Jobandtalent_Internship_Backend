import { sum } from './db-conection';

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
});
