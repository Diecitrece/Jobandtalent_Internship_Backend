import bcrypt from 'bcrypt';
export default async function password_crypt(
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
