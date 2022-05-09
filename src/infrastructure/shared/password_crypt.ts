import bcrypt from 'bcrypt';
import { PasswordCrypt } from '@ports/output/password_crypt.port';

export const passwordCrypt = (): PasswordCrypt => {
  const password_crypt = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
  const password_compare = async (
    password1: string,
    password2: string
  ): Promise<boolean> => {
    return bcrypt.compare(password1, password2);
  };

  return { password_crypt, password_compare };
};
