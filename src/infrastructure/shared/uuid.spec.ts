import { generateId } from './uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('123'),
}));

describe('generateId', () => {
  it('should return a uuid', () => {
    expect(generateId()).toBe('123');
  });
});
