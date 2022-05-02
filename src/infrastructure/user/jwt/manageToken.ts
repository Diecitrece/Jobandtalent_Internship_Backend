import jwt, { Secret } from "jsonwebtoken";
import { UserVerify } from "../../../core/application/ports/input/userCRUD.port";
import { TokenPort } from "../../../core/application/ports/output/token.port";

const secretKey = process.env.JWT_SECRET_KEY;
export const tokenManager = (): TokenPort => {
  const accessToken = async (item: UserVerify) => {
    return jwt.sign(item, secretKey as Secret, { expiresIn: "20s" });
  };
  const verifyToken = async (token: string) => {
    try {
      jwt.verify(token, secretKey as Secret);
      return true;
    } catch (err) {
      return false;
    }
  };
  return { accessToken, verifyToken };
};
