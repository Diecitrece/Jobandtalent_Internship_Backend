export interface PasswordCrypt {
  password_crypt: (password: string) => Promise<string>;
  password_compare: (password1: string, password2: string) => Promise<boolean>;
}
