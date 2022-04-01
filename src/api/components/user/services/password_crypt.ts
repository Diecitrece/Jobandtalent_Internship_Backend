import bcrypt from 'bcrypt';
export default async function password_crypt(password:string):Promise<string>
{
    let salt:string = await bcrypt.genSalt(10);
    let hash:string = await bcrypt.hash(password, salt);
    return hash;
}
