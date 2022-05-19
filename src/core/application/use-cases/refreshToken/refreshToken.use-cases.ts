import { RefreshTokenCRUD } from '@ports/input/refreshTokenCRUD.port';
import { RefreshTokenRepository } from '@ports/output/repository.port';
import { dependenciesContainer } from '@shared/dependency_injection';

export const refreshTokenCases = (): RefreshTokenCRUD => {
  const refreshTokenRepository: () => RefreshTokenRepository =
    dependenciesContainer.cradle.refreshTokenRepository;

  const save = async (idUser: string, token: string): Promise<void> => {
    await refreshTokenRepository().save(idUser, token);
    return;
  };
  const verify = async (token: string): Promise<boolean> => {
    return refreshTokenRepository().verify(token);
  };
  const remove = async (token: string): Promise<void> => {
    await refreshTokenRepository().remove(token);
    return;
  };
  return { save, verify, remove };
};
