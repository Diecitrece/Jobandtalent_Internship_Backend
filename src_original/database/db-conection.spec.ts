import { checkUserExist } from './db-conection';

describe('checkUserExist', () => {
  it('should return a user if user exist', () => {
    const result = checkUserExist('juanfril@gmail.com');
    expect(result).not.toBeUndefined();
  });

  it('should return undefined if user does not exist', () => {
    const result = checkUserExist('example@gmail.com');
    expect(result).toBeUndefined();
  });
});
