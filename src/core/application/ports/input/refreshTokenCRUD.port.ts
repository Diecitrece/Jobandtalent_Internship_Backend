export interface RefreshTokenCRUD {
  save: (idUser: string, token: string) => Promise<void>;
  verify: (token: string) => Promise<boolean>;
  remove: (token: string) => Promise<void>;
}
