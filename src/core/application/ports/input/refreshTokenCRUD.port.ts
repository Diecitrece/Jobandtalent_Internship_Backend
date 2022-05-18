export interface RefreshTokenCRUD {
  save: (token: string) => Promise<void>;
  verify: (token: string) => Promise<boolean>;
  remove: (token: string) => Promise<void>;
}
