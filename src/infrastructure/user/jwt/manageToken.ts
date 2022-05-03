import jwt, { Secret } from "jsonwebtoken";
import { UserVerify } from "../../../core/application/ports/input/userCRUD.port";
import { TokenPort } from "../../../core/application/ports/output/token.port";

const secretKey = process.env.JWT_SECRET_KEY;
export const tokenManager = (): TokenPort => {
  const accessToken = async (item: UserVerify): Promise<string> => {
    return jwt.sign(item, secretKey as Secret, { expiresIn: "35s" });
  };
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      jwt.verify(token, secretKey as Secret);
      return true;
    } catch (err) {
      return false;
    }
  };
  return { accessToken, verifyToken };
};