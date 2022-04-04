import bcrypt from 'bcrypt';
export default async function password_crypt(password:string):Promise<string>
{
    let salt = await bcrypt.genSalt();
    let hash:string = await bcrypt.hash(password, salt);
    return hash;
}
