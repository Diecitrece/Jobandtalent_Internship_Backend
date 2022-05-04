import * as uuid from 'uuid';
import { generateId } from './uuid';

jest.mock('uuid');

describe('generateId', () => {
  it('should return a uuid', () => {
    (uuid.v4 as jest.Mock).mockReturnValue('123');
    expect(generateId()).toBe('123');
  });
});
