import knex from 'knex';
import configs from '@shared/database/knexfile';
import { RefreshTokenRepository } from '@ports/output/repository.port';
const db =
  process.env.NODE_ENV === 'test'
    ? knex(configs.test)
    : knex(configs.development);

export const refreshTokenRepositoryPostgres = (): RefreshTokenRepository => {
  const save = async (idUser: string, token: string): Promise<void> => {
    const tokenExists = await db('refreshTokens').where('idUser', idUser);
    if (tokenExists.length > 0) {
      await db('refreshTokens')
        .where('idUser', idUser)
        .update({ refreshToken: token });
      return;
    }
    await db('refreshTokens').insert({ refreshToken: token, idUser });
  };
  const verify = async (token: string): Promise<boolean> => {
    const tokenExists = await db('refreshTokens').where({
      refreshToken: token,
    });
    if (tokenExists.length > 0) return true;
    return false;
  };
  const remove = async (token: string): Promise<void> => {
    const tokenExists = await db('refreshTokens').where('refreshToken', token);
    if (tokenExists) {
      await db('refreshTokens').where('refreshToken', token).del();
      return;
    }
    return;
  };
  return { save, verify, remove };
};
