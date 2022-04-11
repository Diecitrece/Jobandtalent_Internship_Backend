import { checkUserExist } from './db-conection';

describe('checkUserExist', () => {
  it('should return a user if user exist', async () => {
    const result = await checkUserExist('juanfri@gmail.com');
    expect(result).toEqual({
      address: 'Calle mayor',
      created_at: 2022-04-11T10:29:20.053Z,
      email: 'juanfri@gmail.com',
      firstName: 'jaufnri',
      id: '1e75c522-7fb8-4d23-80ca-04785c7abd05',
      password: '$2b$10$64pp0EB7IsVQoWNDMkDRpeHzVcuJMUVpvasySNZoQ0.xsMznp/yfu',
      phone: '66611223344556',
      surNames: 'vidal',
      updated_at: 2022-04-11T10:29:20.053Z,
    });
  });

  it('should return null if user does not exist', async () => {
    const result = await checkUserExist('example@gmail.com');
    expect(result).toBeNull();
  });
});
